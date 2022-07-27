#!/bin/sh
mkdir build
curl --output build/godot.zip https://downloads.tuxfamily.org/godotengine/3.4.4/Godot_v3.4.4-stable_linux_headless.64.zip
curl --output build/templates.zip https://downloads.tuxfamily.org/godotengine/3.4.4/Godot_v3.4.4-stable_export_templates.tpz
unzip -d build/godot/ build/godot.zip
mkdir -p ~/.local/share/godot/templates/
unzip -d ~/.local/share/godot/templates/ build/templates.zip
mv ~/.local/share/godot/templates/templates ~/.local/share/godot/templates/3.4.4.stable
chmod +x ./build/godot/Godot_v3.4.4-stable_linux_headless.64
mkdir build/built
./build/godot/Godot_v3.4.4-stable_linux_headless.64 -v --export "HTML5" build/built/index.html
python split.py
rm build/built/index.pck