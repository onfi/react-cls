import { readdirSync, renameSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const buildClientDir = './build/client';
const nestedPath = join(buildClientDir, 'react-cls/build/client');

if (existsSync(nestedPath)) {
  const items = readdirSync(nestedPath);
  
  items.forEach(item => {
    const src = join(nestedPath, item);
    const dest = join(buildClientDir, item);
    renameSync(src, dest);
    console.log(`Moved: ${item}`);
  });
  
  rmSync(join(buildClientDir, 'react-cls'), { recursive: true, force: true });
  console.log('Cleaned up nested directories');
}
