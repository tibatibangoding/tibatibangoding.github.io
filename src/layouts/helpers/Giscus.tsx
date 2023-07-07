import config from "@/config/config.json";
import React from "react";

const Giscus = ({ className }: { className?: string }) => {
  const { giscus } = config;

  return (
    <div className={className}>
      {giscus.enable && (
        <script
          src={giscus.src}
          data-repo={giscus.repo}
          data-repo-id={giscus.repo_id}
          data-category={giscus.category}
          data-category-id={giscus.category_id}
          data-mapping={giscus.mapping}
          data-strict={giscus.strict}
          data-reactions-enabled={giscus.reactions}
          data-emit-metadata={giscus.metadata}
          data-input-position={giscus.position}
          data-theme={giscus.darkTheme}
          data-lang={giscus.lang}
          data-loading={giscus.loading}
          crossOrigin="anonymous"
          async
        ></script>
      )}
    </div>
  );
};

export default Giscus;
