import os
import re
import urllib.request

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
            return True
    except Exception as e:
        print(f"[ERR] {url} -> {e}")
        return False

base = "https://manikantapoojastore.com"

# Collect images from files
all_files = [
    "homepage.html",
    "downloaded/manifest.json",
    "downloaded/js/products.js",
    "downloaded/js/home.js",
    "downloaded/js/main.js",
    "downloaded/pages/about.html",
    "downloaded/pages/contact.html",
    "downloaded/pages/shop.html",
    "downloaded/pages/product.html",
    "downloaded/pages/cart.html",
    "downloaded/pages/checkout.html",
    "downloaded/pages/reviews.html",
    "downloaded/pages/login.html",
    "downloaded/pages/register.html"
]

images = set()

for fpath in all_files:
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
            # Match images, icons, uploads
            found = re.findall(r'["\']((?:images/|icons/|uploads/)[^"\']+\.(?:png|jpg|jpeg|webp|ico|svg))["\']', text)
            for img in found:
                images.add(img)
            # Also absolute URLs
            found_abs = re.findall(r'["\'](https://manikantapoojastore\.com/(?:images/|icons/|uploads/)[^"\']+\.(?:png|jpg|jpeg|webp|ico|svg))["\']', text)
            for img in found_abs:
                rel = img.replace('https://manikantapoojastore.com/', '')
                images.add(rel)

print(f"Found {len(images)} unique images to download:")
for img in sorted(images):
    print(" -", img)

for img in sorted(images):
    # Try fetching as is, and if webp try jpg/png or vice versa
    url = f"{base}/{img}"
    dest = f"public/{img}"
    fetch(url, dest)
    if img.endswith('.webp'):
        # also try fetching png/jpg version if available
        for ext in ['.png', '.jpg']:
            alt_img = img.rsplit('.', 1)[0] + ext
            fetch(f"{base}/{alt_img}", f"public/{alt_img}")
    elif img.endswith('.jpg') or img.endswith('.png'):
        alt_img = img.rsplit('.', 1)[0] + '.webp'
        fetch(f"{base}/{alt_img}", f"public/{alt_img}")

