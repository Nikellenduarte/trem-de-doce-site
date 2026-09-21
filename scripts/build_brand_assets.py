"""Gera favicon.svg, og-image.png e apple-touch-icon.png a partir do logo oficial (logo-paths.json)."""
import json, os, sys, subprocess
logo=json.load(open('src/components/ui/logo-paths.json'))
def svg_inner(variant, color):
    v=logo[variant]
    return ''.join(f'<path d="{p["d"]}" fill="{color if p["fill"]=="#560d0d" else "#d8a790"}"/>' for p in v['paths'])
m=logo['monogram']; W,H=m['width'],m['height']
# favicon: monograma centralizado num quadrado 64
s=52/max(W,H); tx=(64-W*s)/2; ty=(64-H*s)/2
fav=(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#FFF9F5"/>'
     f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s:.4f})">{svg_inner("monogram","#7A2638")}</g></svg>')
open('public/favicon.svg','w',encoding='utf-8').write(fav)
scr=sys.argv[1]
og=f"""<!doctype html><html><head><meta charset="utf-8"><style>html,body{{margin:0;background:#FFF9F5}}
.og{{width:1200px;height:630px;display:flex;align-items:center;justify-content:center;gap:90px}}
.m svg{{width:330px}} .w svg{{width:560px}}</style></head><body>
<div class="og"><div class="m"><svg viewBox="{m['viewBox']}" xmlns="http://www.w3.org/2000/svg">{svg_inner('monogram','#7A2638')}</svg></div>
<div class="w"><svg viewBox="{logo['wordmarkStacked']['viewBox']}" xmlns="http://www.w3.org/2000/svg">{svg_inner('wordmarkStacked','#7A2638')}</svg></div></div></body></html>"""
open(os.path.join(scr,'og.html'),'w',encoding='utf-8').write(og)
icon=f"""<!doctype html><html><head><meta charset="utf-8"><style>html,body{{margin:0;background:#FFF9F5}}.i{{width:180px;height:180px;display:grid;place-items:center}}.i svg{{width:150px}}</style></head><body><div class="i"><svg viewBox="{m['viewBox']}" xmlns="http://www.w3.org/2000/svg">{svg_inner('monogram','#7A2638')}</svg></div></body></html>"""
open(os.path.join(scr,'icon.html'),'w',encoding='utf-8').write(icon)
print('favicon + og/icon html ok')
