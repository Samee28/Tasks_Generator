import fs from 'fs';
import path from 'path';

const SPECS_FILE = path.join(process.cwd(), 'data', 'specs.json');

// Ensure data directory exists
export const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load specs from file
export const loadSpecs = (): any[] => {
  try {
    ensureDataDir();
    if (fs.existsSync(SPECS_FILE)) {
      const data = fs.readFileSync(SPECS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading specs:', error);
  }
  return [];
};

// Save specs to file
export const saveSpecs = (specs: any[]) => {
  try {
    ensureDataDir();
    fs.writeFileSync(SPECS_FILE, JSON.stringify(specs, null, 2));
  } catch (error) {
    console.error('Error saving specs:', error);
  }
};
