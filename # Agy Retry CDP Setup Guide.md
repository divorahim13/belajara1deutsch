# Agy Retry CDP Setup Guide

## Quick Setup (Recommended)

Click **"Auto-Create ragy Script"** in the Setup menu. This will:
1. Create `~/bin/ragy` script automatically
2. Guide you to add `~/bin` to your PATH if needed

## Manual Installation

### Step 1: Create the script

```bash
mkdir -p ~/bin
cat > ~/bin/ragy << 'EOF'
#!/bin/bash
PORT=31905
echo "🚀 Launching Antigravity with CDP on port $PORT..."
antigravity --remote-debugging-port=$PORT "$@"
EOF
chmod +x ~/bin/ragy
```

### Step 2: Add ~/bin to PATH (if not already)

```bash
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Step 3: Use ragy

```bash
# Quit your current IDE first (Cmd+Q on macOS)
ragy
```

## Verify Connection

After launching with `ragy`:
- The "CDP Not Connected" notice should disappear
- Auto Retry and Batch Automation features will become available

## Configure Port

Current CDP Port: 31905
Change in: Settings > Extensions > Agy Retry > CDP Port

## Troubleshooting

**"ragy: command not found"**
- Ensure `~/bin` is in your PATH
- Run: `echo $PATH | grep -o '$HOME/bin'`
- Restart your terminal after modifying ~/.zshrc

**CDP still not connected**
- Fully quit the IDE (Cmd+Q), not just close the window
- Run `ragy` from a fresh terminal
- Check if port 31905 is available: `lsof -i :31905`
