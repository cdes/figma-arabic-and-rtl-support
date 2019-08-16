import transform from "./transform";
import { script as io } from './io.js';

figma.showUI(__html__, { width: 400, height: 300,  });

io.on("fix-text", async (data) => {
  const selection = figma.currentPage.selection;

  if (selection.length === 1) {
    if(selection[0].type === 'TEXT') {
      const element = <TextNode>selection[0];
      await figma.loadFontAsync(element.fontName as FontName);
      (element as TextNode).characters = transform(data.text, data.options);
      element.name = data.text;
      element.setPluginData("original-data", JSON.stringify(data));
    }
  }
});

let currentSelection = null;

setInterval(() => {
  const { selection } = figma.currentPage;

  if (selection.length == 0) {
    currentSelection = null;
    io.send("no-selection", {});
  }
  else if(selection.length == 1 && currentSelection !== selection[0].id) {
    const element = selection[0];
    currentSelection = element.id;

    if(element.type === "TEXT") {
      const data = element.getPluginData("original-data");
      io.send("selection", data.length > 0 ? JSON.parse(data) : {
        text: (element as TextNode).characters,
        options: {
          arabic: true,
          isolates: false,
          ligatures: false,
          spaceHack: false,
        }
      }); 
    }
    else {
      io.send("no-selection", {});
    }
  }
  else if (selection.length > 1) {
    io.send("multi-selection", {});
  }

}, 150);