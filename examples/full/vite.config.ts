import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { imagetools } from 'vite-imagetools'

const config: UserConfig = {
	plugins: [sveltekit(), imagetools()]
};

export default config;
