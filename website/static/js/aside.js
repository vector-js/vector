// document.addEventListener("DOMContentLoaded", function(){
//   let headings = document.querySelectorAll("h2");
//   let tops = [];
//   let id = "";
//   for( let i = 0; i < headings.length; i++ ) {
//     tops.push(headings[i].offsetTop);
//   }
//   window.onscroll = function( event ) {
//     let position = document.documentElement.scrollTop;
//     for( let i = tops.length - 1; i >= 0; i--) {
//       if( tops[i] <= position + 1 ) {
//         if( id != headings[i].id ) {
//           document.querySelector(`a[href='#${id}']`).classList.remove('active');
//           id = headings[i].id;
//           console.log(id, `a[href='#${id}']`)
//           document.querySelector(`a[href='#${id}']`).classList.add('active');
//         }
//         break;
//       }
//     }
//   };
//   window.onscroll();
// });
