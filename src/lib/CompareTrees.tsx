import React, { useState } from 'react';
import { CheckboxTree as WdkCheckboxTree } from '@veupathdb/wdk-client/lib/Components';
import CoreUICheckboxTree from '@veupathdb/coreui/dist/components/inputs/checkboxes/CheckboxTree/CheckboxTree';

interface TreeNode {
  value: number;
  children: TreeNode[];
}

function makeTree(numChildren: number, level: number): TreeNode {
  if (level === 0)
    return {
      value: Math.random(),
      children: [],
    };

  const children = Array(numChildren)
    .fill(null)
    .map((_) => makeTree(numChildren, level - 1));

  return {
    value: Math.random(),
    children,
  };
}

function getChildren(node: TreeNode) {
  return node.children;
}

function getNodeId(node: TreeNode) {
  return String(node.value);
}

const tree = makeTree(5, 5);

export function CompareTrees() {
  const [wdkTreeExpansion, setWdkTreeExpansion] = useState<string[]>([]);
  const [coreUiTreeExpansion, setCoreUiTreeExpansion] = useState<string[]>([]);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h1>WDK</h1>
        <WdkCheckboxTree
          tree={tree}
          getNodeChildren={getChildren}
          getNodeId={getNodeId}
          onExpansionChange={setWdkTreeExpansion}
          expandedList={wdkTreeExpansion}
          linksPosition={WdkCheckboxTree.LinkPlacement.Top}
        />
      </div>
      <div>
        <h1>CoreUI</h1>
        <CoreUICheckboxTree
          tree={tree}
          getNodeChildren={getChildren}
          getNodeId={getNodeId}
          onExpansionChange={setCoreUiTreeExpansion}
          expandedList={coreUiTreeExpansion}
          linksPosition={CoreUICheckboxTree.LinkPlacement.Top}
        />
      </div>
    </div>
  );
}
