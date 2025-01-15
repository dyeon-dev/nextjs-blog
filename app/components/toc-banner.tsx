import slugify from "utils/slugify";

export default function TocBanner({ headings }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md">
      <div className="p-4">
        <p
          id="toc-header"
          className="text-primary text-sm font-extrabold leading-6"
        >
          목차
        </p>
        <ul
          id="toc-content"
          className="mt-2 gap-2 flex flex-col items-start justify-start text-md"
        >
          {headings.map((heading, index) => {
            const slug = slugify(heading.text);
            return (
              <li key={index} className={`ml-${heading.level} relative group`}>
                <a
                  href={`#${slug}`}
                  className="block py-1 px-2 rounded-lg transition-all duration-200 ease-in-out 
                     text-neutral-700 dark:text-neutral-300 
                     hover:bg-neutral-100 dark:hover:bg-neutral-800 
                     focus:bg-neutral-200 dark:focus:bg-neutral-700"
                >
                  {heading.text}
                </a>
                {/* <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full 
                     bg-primary scale-y-0 group-hover:scale-y-100 transition-transform 
                     duration-200 ease-in-out origin-bottom"
                ></span> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
