import { Fragment, useEffect, useState } from "react";

export default function TocBanner() {
  return (
    <div
      className={
        "overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md"
      }
    >
      <div className="p-4">
        <p
          id="toc-header"
          className="text-primary text-sm font-extrabold leading-6"
        >
          On this page
        </p>
        <ul
          id="toc-content"
          className="mt-2 flex flex-col items-start justify-start text-sm"
        ></ul>
      </div>
    </div>
  );
}
