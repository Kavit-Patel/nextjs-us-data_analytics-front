import MyAnalyticsFeature from "@/features/MyAnalyticsFeature";

export default async function page({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;
  return <MyAnalyticsFeature alias={alias} />;
}
