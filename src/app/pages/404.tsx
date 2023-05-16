import { Layout } from "app/components";
import { FC } from "react"
import { Link } from "react-router-dom";

const NotFound: FC = () => {
    return (
        <Layout>
            <main className="grid flex-1 place-items-center pt-24 px-6 lg:px-8">
                <div className="text-center">
                    <p className="font-semibold text-green">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-sm leading-7">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to={process.env.DEPLOY_URL+"/"}
                            className="rounded-md bg-green px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-hover"
                        >
                        Go back home
                        </Link>
                    </div>
                </div>
            </main>
      </Layout>
    )
}

export default NotFound;