"""MCP server entry point. Milestones add the OpenAPI loader, curated tools and auth."""
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("openapi-tools")


@mcp.tool()
def ping() -> str:
    """Check the server is running. Replace with real tools generated from the OpenAPI spec."""
    return "pong"


if __name__ == "__main__":
    mcp.run()  # stdio; log to stderr, never print to stdout
