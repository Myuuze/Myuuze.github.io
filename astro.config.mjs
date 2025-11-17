// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightUiTweaks from 'starlight-ui-tweaks'
import starlightBlog from 'starlight-blog'
import tailwindcss from '@tailwindcss/vite';
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightSidebarSwipe from 'starlight-sidebar-swipe'
import starlightContextualMenu from "starlight-contextual-menu";
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://myuuze.github.io',
  integrations: [
        mermaid({
            theme:"forest",
            autoTheme:true
        }),
      starlight({
          title: 'Myuuze',
          logo: {
                src: './src/assets/word-logo.svg',
                replacesTitle: true,
            },
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Myuuze' }],
          customCss: [
            './src/styles/global.css',
        ],
        plugins: [
            starlightUiTweaks({
                navbarLinks: [
                    { label: "Documentation", href: "/getting-started" },
                    { label: "Blog", href: "/blog" },
                    { label: "API", href: "/server/api" },
                ],
            }),
            starlightSidebarTopics([
                // Overview links
                {
                    label:"Overview",
                    link:"/getting-started",
                    icon:"information",
                    items:[
                        {
                            label: 'Gettting started',
                            autogenerate: { directory: "getting-started" },
                        },
                        // {
                        //     label: 'Dump system',
                        //     autogenerate: { directory: "getting-started" }, // TODO: change
                        // },
                        // {
                        //     label: 'Modifying settings',
                        //     autogenerate: { directory: "getting-started" }, // TODO: change
                        // },
                    ],

                },

                // Server-focused links
                {
                    label:"Server",
                    link:"/server",
                    icon:"laptop",
                    items:[
                        {
                            label: "Overview",
                            items: ["server", "server/getting-started"],
                        },

                        {
                            label: 'API',
                            autogenerate: { directory: 'server/api' },
                        },
                        {
                            label: 'Development Guide',
                            autogenerate: { directory: 'server/development-guide' },
                        },
                    ],

                },

                // Frontend-focused links
                {
                    label:"Frontend",
                    link:"/frontend",
                    icon:"pencil",
                    items:[
                        {
                            label: 'Overview',
                            autogenerate: { directory: 'frontend' },
                        }
                    ],

                },
                {
                    label:"Blog",
                    link:"/blog",
                    icon:"open-book",
                    items:[],
                    id: 'blog', // make the blog plugin play nice with the sidebar
                },
            ],

            {
                topics: {
                    // make the blog plugin play nice with the sidebar
                    blog: ['/blog', '/blog/**/*'],
                },
            },
            ), // end of sidebar config

            starlightBlog({
            authors: {
                kieran: {
                    name:"kieran",
                    title:"descent098",
                    url:"https://github.com/descent098",
                    picture:"src/assets/avatars/kieran.jpg"
                },
            },
            }),

            // Enables swiping in the menu from the side on moble
            starlightSidebarSwipe(), 

            // Enables view-as and copy-page options
            starlightContextualMenu({
                actions: ["copy", "view", "chatgpt", "claude"]
            }),

        ],
        components: {
            // Override the default `Sidebar` component with a custom one.
            Sidebar: './src/components/Sidebar.astro',
        },
        
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});