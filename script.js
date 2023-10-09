
$(document).ready(function() {

  
  $.getJSON('data.json', function(data) {
   
    $.each(data, function(index, job) {
      // Create a card for each job
      if(job.featured== true)
      {
        var card = $('<div class="card fea"></div>');
      }
      else {
        var card = $('<div class="card "></div>');
      }
  
      // Creating the HTML structure for the card content
      var cardContent = `
        <div class="img">
          <img class="image" src="${job.logo}" alt="logo not displayed">
        </div>
        <div class="MainContent">
          <div class="head1">
            <p id="comp">${job.company}</p>
            ${job.new ? '<p class="new">New</p>' : ''}
            ${job.featured ? '<p class="Featured">Featured</p>' : ''}
          </div>
          <div class="head2">
            <h3>${job.position}</h3>
          </div>
          <div class="head3">
            <p id="day">${job.postedAt}</p>
            <p id="time">${job.contract}</p>
            <p id="Place">${job.location}</p>
          </div>
          
        </div>
        <div class="skills">
          ${job.languages.map(language => `<p class="ski" id="sk">${language}</p>`).join('')}
          ${job.tools.map(tool => `<p class="ski" id="sk">${tool}</p>`).join('')}
        </div>
        <div class="cross">
          <h4 id="cr">X</h4>
          </div>
      `;

      card.html(cardContent);
      $('.inner_content').append(card);

   
      var popup=  $('<div id="popup" class="popup"></div>');

      var popup_content=`
  
      <div class="popup-content">
      <span class="closePopup" ">X</span>
      <img class="image-pop" src="${job.logo}" alt="logo not displayed">
      <h3 id="jobLogo">${job.company}</h3>
      <div class="Flex">
      <p id="p1"><span id="bold">Job Position:</span> ${job.position}</p>
      <p id="p1"><span id="bold">Job Contract:</span> ${job.contract}</p>
      <p id="p1"><span id="bold">Job Location:</span> ${job.location}</p><br><br>
      </div>
      <p id="p4">
      ${job.company} Company is a dynamic and innovative organization that stands at the forefront of its industry. With a rich history of excellence spanning over two decades, we have continually evolved to meet the changing needs of our customers. Our commitment to quality, integrity, and customer satisfaction is the cornerstone of our success. At  ${job.company} Company, we pride ourselves on a diverse and talented team, driving forward groundbreaking solutions that shape the future. Our cutting-edge technology, global reach, and unwavering dedication to sustainability make us a trusted partner in delivering outstanding products and services to our clients worldwide.  
      <br>Email <span id="bold">${job.company}@gmail.com</span>
      </p> 
      </div>    
      `;
      popup.html(popup_content);
      $('.content').append(popup);
    });


  });

  

  $(document).on("click", "#sk", function() {  

    //alert("Element with ID 'sk' was clicked!");
    const skill = $(this);
    var selectedTool = skill.text();
    const filterBox = $('.filterBox');

        var newSkill = $(`<p class="Filter-Skill">${skill.text()}</p>`);
        var newcross = $(`<p class="newCross">X</p>`);
        $('.filterBox').append(newSkill);
        $('.filterBox').append(newcross);

        $('.clear').show();

        newcross.css({

          "color":"hsl(180, 29%, 50%)",
          "font-weight": "bold",
          "padding":"5px 0px",
          "margin-right":"13px",
          "height":"20%",
          "margin-top":"20px",
          "cursor":"pointer",

        })
        newSkill.css({

          "color": "rgb(32, 75, 75)",
          "font-weight": "bold",
          "background-color": "rgb(172, 206, 206)",
          "padding":"5px 10px",
          "height":"23%",
          "width":"72px",
          "margin-top":"20px",
          "margin-bottom":"20px",
          "border-radius": "10px"

        })
            
          $('.card').each(function() {
            const card = $(this);
           const cardSkills = card.find('.skills .ski').map(function() {
              return $(this).text();
            }).get();

            if (!cardSkills.includes(selectedTool)) {
              card.hide();
            }
          });
        

  });

  $(document).on("click", "#cr", function() {

    $(this).closest('.card').remove();
  });



  $(document).on("click", ".MainContent", function() {

    const company = $(this).find("#comp").text();

    // Iterate through all popups
    $(".popup").each(function() {
      // Check if the company name in the popup matches the clicked card's company name
      if ($(this).find("h3").text() === company) {
      
        $(this).show();
      } else {
        // Hide other popups
        $(this).hide();
      }
    });

  });
    // Close the popup when the close button  is clicked
    $(document).on("click", ".popup", function() {
      $(".popup").hide();
  });

  // Prevent the popup from closing when its content is clicked
  $(".popup-content").click(function (event) {
      event.stopPropagation();
  });
  


  $(document).on("click", ".newCross", function() {
    
    // Remove the clicked skill from the filter box
    const skillText = $(this).prev(".Filter-Skill").text(); 
    $(this).prev(".Filter-Skill").remove(); // Remove the skill element
    $(this).remove(); // Remove the cross element
    
    $('.card').show();

    const filterSkills = $('.Filter-Skill').map(function() {
      return $(this).text();
    }).get();

    if (filterSkills.length > 0) {
      $('.card').each(function() {
        const card = $(this);
        const cardSkills = card.find('.skills .ski').map(function() {
          return $(this).text();
        }).get();
  
        if (!filterSkills.every(skill => cardSkills.includes(skill))) {
          card.hide();
        }
      });
    }
 
});

$(document).on("click", ".clear", function() {

  $(".Filter-Skill, .newCross").remove();
  $(".card").show();

  $(".clear").remove();


})

$(document).on("click", ".plus", function() {

    $(".Add_Popup").show();
    $(".content").hide();
})



//  $(".content").show();
document.getElementById("jobPostingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });

  data.languages = data.languages.split(",");
  data.tools = data.tools.split(",");

  console.log("Submitted Data:", data);

    $(".Add_Popup").hide();
  

    // Create a card for each job

    if(data.checkbox2== "Featured")
    {
      var card = $('<div class="card fea"></div>');
    }
    else {
      var card = $('<div class="card "></div>');
    }


   var source="images/"+data.logo.name;
    var cardContent = `
      <div class="img">
        <img class="image" src="${source}" alt="logo not displayed">
      </div>
      <div class="MainContent">
        <div class="head1">
          <p id="comp">${data.company}</p>
          ${data.checkbox1 ? '<p class="new">New</p>' : ''}
          ${data.checkbox2 ? '<p class="Featured">Featured</p>' : ''}
        </div>
        <div class="head2">
          <h3>${data.position}</h3>
        </div>
        <div class="head3">
          <p id="day">${data.postedAt}</p>
          <p id="time">${data.contract}</p>
          <p id="Place">${data.location}</p>
        </div>
        
      </div>
      <div class="skills">
        ${data.languages.map(language => `<p class="ski" id="sk">${language}</p>`).join('')}
        ${data.tools.map(tool => `<p class="ski" id="sk">${tool}</p>`).join('')}
        
      </div>
      <div class="cross">
        <h4 id="cr">X</h4>
        </div>
    `;

    console.log(cardContent);
    card.html(cardContent);
    $('.inner_content').prepend(card);

     $(".content").show();
});

 });
  
 