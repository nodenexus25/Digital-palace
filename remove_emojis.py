import os
import re

def remove_emojis_from_file(file_path):
    # Regex for common emojis and variation selectors
    # \uFE0F is the Variation Selector-16 (VS16) often used with emojis
    emoji_pattern = re.compile(
        u'([\U00002600-\U000027BF])|' 
        u'([\U0001f300-\U0001f64f])|'
        u'([\U0001f680-\U0001f6ff])|'
        u'([\U0001f900-\U0001f9ff])|'
        u'([\U0001f1e0-\U0001f1ff])|'
        u'([\U0001fa70-\U0001faff])|' # Symbols and Pictographs Extended-A
        u'([\ufe0f])' 
        "+", flags=re.UNICODE)

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace emojis with empty string
        new_content = emoji_pattern.sub('', content)
        
        # Clean up double spaces or markdown artifacts
        new_content = new_content.replace('**  ', '** ').replace('  ', ' ')
        # Clean up empty markdown bold markers if they were wrapping an emoji
        new_content = new_content.replace('****', '')
        
        # Specific replacement for the header emoji if present (only in dynasties page)
        if 'dynasties' in file_path:
             new_content = new_content.replace('<div className="text-6xl mb-6"></div>', '') # If emoji was removed leaving empty div
             new_content = new_content.replace('<div className="text-6xl mb-6">👑</div>', '') # If regex missed it
        
        # Clean up broken regex from LanguageProvider.tsx if present (e.g. |||||||)
        if 'LanguageProvider.tsx' in file_path:
            # This is a bit risky but needed if I want to automate cleanup of the regex line
            # The regex line was .replace(/.../g, '')
            # If it became .replace(/|||/g, '') or similar
            # I already fixed it manually via SearchReplace, so maybe I don't need this.
            pass

        if content != new_content:
            print(f"Removing emojis from {file_path}")
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            # print(f"No emojis found in {file_path}")
            pass

    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def process_directory(directory):
    print(f"Scanning directory: {directory}")
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                remove_emojis_from_file(file_path)

if __name__ == "__main__":
    target_dir = r"b:\Rajputana\src\app"
    process_directory(target_dir)
