import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
// let test = new Interactive(getScriptName());
// test.width = 768;
// test.height = 200;
// test.svg.style.border = "1px solid grey";
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.svg.style.border = "1px solid grey";
interactive.svg.style.borderRadius = "4px";
let scrubber = interactive.scrubber(100, 75, 468);
scrubber.width = interactive.svg.getBoundingClientRect().width - 300;
window.addEventListener('resize', () => {
    let value = scrubber.value;
    scrubber.width = interactive.svg.getBoundingClientRect().width - 300;
    scrubber.value = value;
});
// 
// interactive.height = 50;
// interactive.svg.style.border = "1px solid grey";
// interactive.svg.style.borderRadius = "4px";
// let scrubber = interactive.scrubber( 25, 25, 100);
// scrubber.width = interactive.svg.getBoundingClientRect().width - 128;
//
// window.addEventListener('resize', () => {
//   let value = scrubber.value;
//   scrubber.width = interactive.svg.getBoundingClientRect().width - 128;
//   scrubber.value = value;
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NydWJiZXItZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9leGFtcGxlcy9lbGVtZW50cy9zY3J1YmJlci1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUMsK0NBQStDO0FBQy9DLG9CQUFvQjtBQUNwQixxQkFBcUI7QUFDckIsNENBQTRDO0FBRTVDLDZCQUE2QjtBQUM3QixJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztBQUNoRCxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzNDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuRCxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQ3JDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDM0IsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNyRSxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILEdBQUc7QUFDSCwyQkFBMkI7QUFDM0IsbURBQW1EO0FBQ25ELDhDQUE4QztBQUM5QyxxREFBcUQ7QUFDckQsd0VBQXdFO0FBQ3hFLEVBQUU7QUFDRiw0Q0FBNEM7QUFDNUMsZ0NBQWdDO0FBQ2hDLDBFQUEwRTtBQUMxRSw0QkFBNEI7QUFDNUIsTUFBTSJ9