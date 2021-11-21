


const logoPath = 'src/resources/images/logo.png';


const titleView = () => {

   $("#App").append(
       $("<img/>", {class: "title"}).attr("src", logoPath)
   );

}


export default titleView;