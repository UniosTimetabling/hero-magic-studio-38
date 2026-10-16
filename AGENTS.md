<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep uploaded site content in TanStack file routes and shared navigation, footer, and secondary-page introductions in SiteLayout so page structure stays consistent.
- Define dropdown dimensions and page-opening visual styles in src/styles.css; all navigation groups use one shared panel layout to prevent resizing between menus.
- Import website media (logo, hero, banners, covers) directly from the committed image files in src/assets; do not use Lovable .asset.json pointers.
- Use the shared PageIntro scroll control to target its next sibling section and respect reduced-motion preferences, keeping every secondary page consistent.
- Prebundle embla-carousel-react in Vite optimizeDeps so the slideshow and renderer share one React module graph even in an already-open preview.
