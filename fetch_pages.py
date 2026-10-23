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

pages = [
    "shop.html",
    "about.html",
    "contact.html",
    "cart.html",
    "login.html",
    "register.html",
    "reviews.html",
    "product.html",
    "checkout.html",
    "account.html",
    "privacy.html",
    "terms.html",
    "shipping.html",
    "refund.html",
    "disclaimer.html",
    "faq.html"
]

for p in pages:
    fetch(f"{base}/{p}", f"downloaded/pages/{p}")
