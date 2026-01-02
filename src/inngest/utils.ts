import { Connection, Node } from "@prisma/client";
import toposort from "toposort";

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  // if no connections, return nodes as is
  if (connections.length === 0) {
    return nodes;
  }

  //create the edges array for toposort
  const edges: [string, string][] = connections.map((conn) => [
    conn.fromNodeId,
    conn.toNodeId,
  ]);

  //add nodes with no connection as self loop to ensure they are included
  const connectedNodeIds = new Set<string>();
  for (const conn of connections) {
    connectedNodeIds.add(conn.fromNodeId);
    connectedNodeIds.add(conn.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  //perform topological sort
  let sortedNodeIds: string[];
  try {
    sortedNodeIds = toposort(edges);
    //remove duplicates from self edges
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (e) {
    if (e instanceof Error && e.message.includes("Cyclic")) {
      throw new Error("Workflow contains a cycle");
    }
    throw e;
  }

  //map sorted ids to node objects
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  return sortedNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean);
};
