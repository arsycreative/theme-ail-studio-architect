import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "home.projectsPage",
  });
  return { title: t("metaTitle"), description: t("description") };
}

export default function ProjectsPage() {
  return <ProjectsExplorer />;
}
