#!/bin/bash

# Installation script for Playwright OrangeHRM automation project

echo "🚀 Installing Playwright OrangeHRM Automation Test Project..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo ""

# Install npm dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Run setup to save authentication session:"
echo "   npm test tests/auth.setup.ts"
echo ""
echo "2. Run all tests:"
echo "   npm test"
echo ""
echo "3. View test report:"
echo "   npm run report"
echo ""
echo "For more information, see README.md"
