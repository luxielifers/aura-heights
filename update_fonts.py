import os, glob

files = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.css', recursive=True)
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if 'font-tenor' in content:
        content = content.replace('font-tenor', 'font-manrope')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
print("Done")
