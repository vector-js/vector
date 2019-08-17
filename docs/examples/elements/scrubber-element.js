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
interactive.root.style.border = "1px solid grey";
interactive.root.style.borderRadius = "4px";
let scrubber = interactive.scrubber(100, 75, 468);
scrubber.width = interactive.root.getBoundingClientRect().width - 300;
window.addEventListener('resize', () => {
    let value = scrubber.value;
    scrubber.width = interactive.root.getBoundingClientRect().width - 300;
    scrubber.value = value;
});
//
// interactive.height = 50;
// interactive.root.style.border = "1px solid grey";
// interactive.root.style.borderRadius = "4px";
// let scrubber = interactive.scrubber( 25, 25, 100);
// scrubber.width = interactive.root.getBoundingClientRect().width - 128;
//
// window.addEventListener('resize', () => {
//   let value = scrubber.value;
//   scrubber.width = interactive.root.getBoundingClientRect().width - 128;
//   scrubber.value = value;
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NydWJiZXItZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9leGFtcGxlcy9lbGVtZW50cy9zY3J1YmJlci1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUMsK0NBQStDO0FBQy9DLG9CQUFvQjtBQUNwQixxQkFBcUI7QUFDckIsNENBQTRDO0FBRTVDLDZCQUE2QjtBQUM3QixJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztBQUNqRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzVDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuRCxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBRXRFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQ3JDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDM0IsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUN0RSxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILEVBQUU7QUFDRiwyQkFBMkI7QUFDM0Isb0RBQW9EO0FBQ3BELCtDQUErQztBQUMvQyxxREFBcUQ7QUFDckQseUVBQXlFO0FBQ3pFLEVBQUU7QUFDRiw0Q0FBNEM7QUFDNUMsZ0NBQWdDO0FBQ2hDLDJFQUEyRTtBQUMzRSw0QkFBNEI7QUFDNUIsTUFBTSJ9