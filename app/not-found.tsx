import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap"><div className="phead"><span className="mono">Error 404</span><h1>Wrong platform</h1>
      <p>This page doesn&apos;t exist, or it has moved. <Link href="/learn/">See all lines</Link> or go back to the <Link href="/">route map</Link>.</p></div></div>
  );
}
