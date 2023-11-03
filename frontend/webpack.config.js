import { join } from 'path';

export const entry = './src/index.js';
export const output = {
  path: join(__dirname, 'dist'),
  filename: 'bundle.js', // Output bundle file name
};
export const module = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
  ],
};
