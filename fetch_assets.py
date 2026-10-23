import urllib.request
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': '*/*'
}

def fetch(url, dest):
    os.makedirs(os.path.dirname(dest) or '.', exist_ok=True)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            with open(dest, 'wb') as f:
                f.write(content)
            print(f"[OK] {url} -> {dest} ({len(content)} bytes)")
            return content
    except Exception as e:
        print(f"[ERR] {url} -> {e}")
        return None

base = "https://manikantapoojastore.com"

# Crawl sitemap and robots
fetch(f"{base}/robots.txt", "downloaded/robots.txt")
fetch(f"{base}/sitemap.xml", "downloaded/sitemap.xml")
fetch(f"{base}/manifest.json", "downloaded/manifest.json")

# Crawl CSS
css_files = [
    "css/style.min.css",
    "css/style.css",
    "css/mobile.min.css",
    "css/mobile.css",
    "css/components.min.css",
    "css/components.css",
    "css/home.min.css",
    "css/home.css",
    "css/shop.min.css",
    "css/shop.css"
]
for c in css_files:
    fetch(f"{base}/{c}", f"downloaded/{c}")

# Crawl JS
js_files = [
    "js/products.min.js",
    "js/products.js",
    "js/main.min.js",
    "js/main.js",
    "js/home.min.js",
    "js/home.js",
    "js/auth.min.js",
    "js/auth.js",
    "js/shop.min.js",
    "js/shop.js",
    "js/cart.min.js",
    "js/cart.js"
]
for j in js_files:
    fetch(f"{base}/{j}", f"downloaded/{j}")

