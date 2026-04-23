import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Clue\'s Blog',
    description: 'New posts every second',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./blog/**/*.md')),
    customData: `<language>en-us</language>`,
  });
}