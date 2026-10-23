import urllib.request
import re
import os

with open('homepage.html', 'r', encoding='utf-8') as f:
    text = f.read()

print("=== HOMEPAGE ANALYSIS ===")
print("Total length:", len(text))

# Find CSS
print("\n--- STYLESHEETS ---")
for m in re.findall(r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)["\']', text):
    print(m)

# Find JS
print("\n--- SCRIPTS ---")
for m in re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', text):
    print(m)

# Find images
print("\n--- IMAGES ---")
for m in re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', text):
    print(m)

# Find all links
print("\n--- ALL A TAGS ---")
for href, content in re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', text, re.DOTALL):
    clean = re.sub(r'<[^>]+>', ' ', content).strip()
    clean = ' '.join(clean.split())
    print(f"{href} | {clean}")

# Find sections / IDs
print("\n--- SECTIONS & IDS ---")
for m in re.findall(r'<(section|div|header|footer|nav)[^>]+id=["\']([^"\']+)["\']', text):
    print(m)
