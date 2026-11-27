<?php
/* Projekt 1024 · Formular-Endpunkt (Master: shared/anfrage.php)
   Sendet Anfragen per PHP mail() an das eigene Postfach. Kein fremder Formulardienst.
   Voraussetzung bei Strato: das Postfach in EMPFAENGER existiert (E-Mail-Verwaltung).
   Antwort immer JSON: {"ok":true} oder {"ok":false,"fehler":"..."} */
const EMPFAENGER = 'kontakt@projekt1024.net';   // wird beim Bauen je Seite gesetzt
const ABSENDER   = 'kontakt@projekt1024.net';   // Strato verlangt eine Absenderadresse der eigenen Domain
const SEITE      = 'mantis1024.ai';
const MAX_PRO_STUNDE = 5;
date_default_timezone_set('Europe/Berlin');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
function antwort(int $code, array $daten): void { http_response_code($code); echo json_encode($daten, JSON_UNESCAPED_UNICODE); exit; }
function einzeilig(string $s): string { return trim(preg_replace('/[\r\n\t\x00-\x1F\x7F]+/u', ' ', $s)); }
function laenge(string $s): int { return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s); }

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') antwort(405, ['ok'=>false,'fehler'=>'Nur POST erlaubt.']);
// Honeypot: Bots bekommen eine neutrale Antwort, es wird nichts gesendet
if (trim((string)($_POST['_gotcha'] ?? '')) !== '') antwort(200, ['ok'=>true]);

// Feld => [Pflicht, min, max, mehrzeilig]
$felder = [
  'name'      => [true, 2, 100, false],
  'email'     => [true, 5, 200, false],
  'telefon'   => [false, 0, 40, false],
  'bereich'   => [false, 0, 80, false],
  'anlass'    => [false, 0, 80, false],
  'nachricht' => [false, 0, 5000, true],
  'vorhaben'  => [false, 0, 5000, true],
  'auswahl'   => [false, 0, 3000, true],
];
$werte = []; $fehler = [];
foreach ($felder as $k => [$pflicht, $min, $max, $multi]) {
  $v = (string)($_POST[$k] ?? '');
  if (function_exists('mb_check_encoding') && !mb_check_encoding($v, 'UTF-8')) { $fehler[] = $k; continue; }
  $v = $multi ? trim(str_replace(["\r\n", "\r"], "\n", preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v))) : einzeilig($v);
  if ($pflicht && $v === '') { $fehler[] = $k; continue; }
  if ($v !== '' && (laenge($v) < $min || laenge($v) > $max)) { $fehler[] = $k; continue; }
  $werte[$k] = $v;
}
$text = ($werte['nachricht'] ?? '') !== '' ? $werte['nachricht'] : ($werte['vorhaben'] ?? '');
if (laenge($text) < 10) $fehler[] = 'nachricht';
if (!filter_var($werte['email'] ?? '', FILTER_VALIDATE_EMAIL)) $fehler[] = 'email';
$zustimmung = ($_POST['datenschutz'] ?? $_POST['einwilligung'] ?? '');
if ($zustimmung === '' ) $fehler[] = 'datenschutz';
if ($fehler) antwort(422, ['ok'=>false,'fehler'=>'Bitte prüfen Sie Ihre Angaben.','felder'=>array_values(array_unique($fehler))]);

// Rate-Limit je IP (gehasht, nur Zeitstempel, Ordner per .htaccess gesperrt)
$ordner = __DIR__ . '/.anfrage-limit';
if (!is_dir($ordner)) { @mkdir($ordner, 0700); @file_put_contents("$ordner/.htaccess", "Require all denied\nDeny from all\n"); }
$datei = $ordner . '/' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '-') . SEITE) . '.json';
$jetzt = time(); $liste = [];
if (is_file($datei)) { $liste = array_filter((array)json_decode((string)@file_get_contents($datei), true), fn($t) => is_int($t) && $t > $jetzt - 3600); }
if (count($liste) >= MAX_PRO_STUNDE) antwort(429, ['ok'=>false,'fehler'=>'Zu viele Anfragen in kurzer Zeit. Bitte später erneut versuchen.']);

$bereich = ($werte['bereich'] ?? '') ?: ($werte['anlass'] ?? '');
$betreff = 'Anfrage über ' . SEITE . ($bereich !== '' ? ' · ' . $bereich : '');
$zeilen = ['Name: ' . $werte['name'], 'E-Mail: ' . $werte['email'], 'Telefon: ' . (($werte['telefon'] ?? '') ?: '–')];
if ($bereich !== '') $zeilen[] = 'Bereich: ' . $bereich;
if (($werte['auswahl'] ?? '') !== '') { $zeilen[] = ''; $zeilen[] = 'Anfrageliste:'; $zeilen[] = $werte['auswahl']; }
$zeilen[] = ''; $zeilen[] = 'Nachricht:'; $zeilen[] = $text;
$zeilen[] = ''; $zeilen[] = '— gesendet über das Formular auf ' . SEITE . ' am ' . date('d.m.Y H:i') . ', Datenschutz bestätigt';
$body = implode("\n", $zeilen);

$enc = fn($s) => function_exists('mb_encode_mimeheader') ? mb_encode_mimeheader($s, 'UTF-8', 'B', "\r\n") : '=?UTF-8?B?' . base64_encode($s) . '?=';
$headers = implode("\r\n", [
  'From: ' . $enc(SEITE) . ' <' . ABSENDER . '>',
  'Reply-To: ' . einzeilig($werte['email']),   // validiert, ohne Zeilenumbrüche
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  'X-Mailer: Projekt1024-Formular',
]);
$ok = @mail(EMPFAENGER, $enc(einzeilig($betreff)), $body, $headers, '-f' . ABSENDER);
if (!$ok) antwort(502, ['ok'=>false,'fehler'=>'Die Nachricht konnte gerade nicht gesendet werden.']);
$liste[] = $jetzt; @file_put_contents($datei, json_encode(array_values($liste)), LOCK_EX);
antwort(200, ['ok'=>true]);
