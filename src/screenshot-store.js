import { writable } from 'svelte/store';

const screenshots = writable([]);

const screenshotStore = {
  subscribe: screenshots.subscribe,
  setScreenshots: (screenshotArray) => {
    screenshots.set(screenshotArray);
  },
  addScreenshot: screenshotData => {
    const newScreenshot = {
      ...screenshotData
    };
    screenshots.update(items => {
      return [newScreenshot, ...items];
    });
  },
  filteredScreenshot: search => {
    screenshots.update(items => {
      const filtered = [...items.filter(i => i.tags.includes(search))];
      console.log(filtered);
      return items = [...filtered];
    });
  },
  updateAddAwesome: id => {
    screenshots.update(items => {
      const updatedScreenshot = {...items.find(screenshot => screenshot.id === id)};
      updatedScreenshot.numberAwesome = updatedScreenshot.numberAwesome + 1;
      const screenshotIndex = items.findIndex(screenshot => screenshot.id === id);
      const updatedScreenshots = [...items];
      updatedScreenshots[screenshotIndex] = updatedScreenshot;
      return updatedScreenshots;
    });
  },
  updateMinusAwesome: id => {
    screenshots.update(items => {
      const updatedScreenshot = {...items.find(screenshot => screenshot.id === id)};
      updatedScreenshot.numberAwesome = updatedScreenshot.numberAwesome - 1;
      const screenshotIndex = items.findIndex(screenshot => screenshot.id === id);
      const updatedScreenshots = [...items];
      updatedScreenshots[screenshotIndex] = updatedScreenshot;
      return updatedScreenshots;
    });
  },
};


export default screenshotStore;