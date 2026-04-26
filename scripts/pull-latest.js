import { execSync } from 'child_process';

try {
  const result = execSync('git pull origin main', { cwd: '/vercel/share/v0-project', encoding: 'utf-8' });
  console.log('[v0] Git pull result:');
  console.log(result);
} catch (error) {
  console.error('[v0] Error pulling latest main:');
  console.error(error.message);
}
