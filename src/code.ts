import transform from "./transform";

figma.showUI(__html__, { width: 400, height: 300,  });

function init() {
  const selection = figma.currentPage.selection;

    if (selection.length > 0) {
      const element = selection[0];
      const data = element.getPluginData("original-data");
      figma.ui.postMessage({
        type: 'init',
        data: data.length > 0 ? JSON.parse(data) : null
      })
    }
}

init();

figma.ui.onmessage = async msg => {    
  if (msg.type === 'fix-text') {
    const selection = figma.currentPage.selection;

    if (selection.length > 0) {
      if(selection[0].type === 'TEXT') {
        const element = <TextNode>selection[0];
        await figma.loadFontAsync(element.fontName as FontName);
        (element as TextNode).characters = transform(msg.text, msg.options);
        element.name = msg.text;
        element.setPluginData("original-data", JSON.stringify(msg));
      }
    }
  }
};

