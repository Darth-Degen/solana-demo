// pages/form.tsx
import { ExampleForm, withPageShell } from "@components";
import { GetServerSideProps } from "next";

const FormView = () => (
  <div className="container mx-auto max-w-3xl py-12">
    <ExampleForm />
    <ExampleForm />
  </div>
);

type FormPageProps = {
  initialValues: { name: string; email: string };
};

// ✅ SSR runs as usual; the HOC doesn't interfere with data fetching
export const getServerSideProps: GetServerSideProps<FormPageProps> = async (
  ctx
) => {
  // Fetch user/session/page data, etc.
  const initialValues = { name: "Jane Doe", email: "jane@test.com" };
  return { props: { initialValues } };
};

export default withPageShell(
  FormView,
  /* shellProps */ {},
  /* pageOptions (read by the shell + _app for header) */ {
    header: "animate", // or "animate" | "absolute" | "hidden"
    seo: {
      title: "Form - Sandbox Portfolio",
      description: "A demo by Sandbox.",
      url: "https://addurl.xyz/form",
    },
  }
);
