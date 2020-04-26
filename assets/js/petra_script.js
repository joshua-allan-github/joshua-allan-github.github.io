function loadAll(blogs_content, crumb_href_parent, crumb_parent, crumb_child){
  loadHeader(crumb_href_parent, crumb_parent, crumb_child)
  loadBlogs(blogs_content)
  loadLinks()
  loadFooter()
}


function loadAbout(staff_content, crumb_href_parent, crumb_parent, crumb_child){
  loadHeader(crumb_href_parent, crumb_parent, crumb_child)
  loadStaff(staff_content)
  loadLinks()
  loadFooter()
}


//----- Init Profile Data -----
class Profile { 
  constructor(address, email, phone, fax){ 
    this.address=address; 
    this.email=email; 
    this.phone=phone; 
    this.fax=fax; 
  } 
  getAddress(){ 
    return this.address; 
  } 
  getEmail(){ 
    return this.email; 
  } 
  getPhone(){ 
    return this.phone; 
  } 
  getFax(){ 
    return this.fax; 
  } 
}
const profile = new Profile("Siwalankerto 121-131, Surabaya", "ptik@petra.ac.id", "+62 31 8439040, +62 31 8394830-31", "+62 31 8436418");
//----- End Init Profile Data -----


function loadHeader(href, parent, child){
  var breadcrumbs = ""

  if (href){
    breadcrumbs = '<section id="breadcrumbs" class="breadcrumbs">'+
    '<nav class="navbar navbar-expand-lg d-flex align-items-center justify-content-between breadcrumb-attrib">'+
    '<div class="container">'+
    '<h5><a href="'+href+'" class="white">'+parent+'</a><span> / </span><strong>'+child+'</strong></h5>'+
    '<h4 class="text-lowercase"><a href="mailto:'+profile.getEmail()+'" class="white"><i class="fa fa-envelope mr-2 footer-icon"></i>'+profile.getEmail()+'</a></h4>'+
    '</div>'+
    '</nav>'+
    '</section>'
  }

  $("#append_header").append(
   '<!-- MENU BAR -->'+
   '<nav class="navbar navbar-expand-lg">'+
   '<div class="container">'+
   '<a class="navbar-brand" href="index.html">'+
   '<img src="assets/images/petra/logo_ptik.png" class="img-fluid" alt="">'+
   '</a>'+

   '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">'+
   '<span class="navbar-toggler-icon"></span>'+
   '</button>'+

   '<div class="collapse navbar-collapse" id="navbarNav">'+
   '<ul class="navbar-nav ml-auto" id="append_navbar">'+

   '<li class="nav-item">'+
   '<a href="index.html" class="nav-link smoothScroll">Home</a>'+
   '</li>'+

   '<li class="nav-item dropdown">'+
   '<a href="#layanan" class="nav-link smoothScroll dropdown-toggle" data-toggle="dropdown">Layanan <b class="caret"></b></a>'+
   '<ul class="dropdown-menu">'+
   '<li><a href="layanan_mahasiswa_dan_pegawai.html">Mahasiswa dan Pegawai</a></li>'+
   '<li><a href="layanan_unit.html">Unit</a></li>'+
   '<li><a href="layanan_tarif.html">Tarif</a></li>'+
   '</ul>'+
   '</li>'+

   '<li class="nav-item dropdown">'+
   '<a href="#fasilitas" class="nav-link smoothScroll dropdown-toggle" data-toggle="dropdown">Fasilitas <b class="caret"></b></a>'+
   '<ul class="dropdown-menu">'+
   '<li><a href="fasilitas_ruang_laptop.html">Ruang Laptop</a></li>'+
   '<li><a href="fasilitas_labkom.html">Laboratorium Komputer</a></li>'+
   '<li><a href="fasilitas_hotspot.html">Hotspot</a></li>'+
   '<li><a href="fasilitas_video_conference.html">Video Conference</a></li>'+
   '</ul>'+
   '</li>'+

   '<li class="nav-item">'+
   '<a href="tutorial.html" class="nav-link smoothScroll">Tutorial</a>'+
   '</li>'+

   '<li class="nav-item">'+
   '<a href="download.html" class="nav-link smoothScroll">Download</a>'+
   '</li>'+

   '<li class="nav-item dropdown">'+
   '<a href="fasilitas.html" class="nav-link contact smoothScroll dropdown-toggle" data-toggle="dropdown">Tentang Kami <b class="caret"></b></a>'+
   '<ul class="dropdown-menu">'+
   '<li><a href="about_profil.html">Profil</a></li>'+
   '<li><a href="about_kontak.html">Kontak</a></li>'+
   '<li class="nav-item dropdown"><a href="#" class="smoothScroll">Staff</a>'+
   '<ul class="dropdown-menu">'+
   '<li><a href="about_staff_tetap.html">Staff Tetap</a></li>'+
   '<li><a href="about_staff_mpw.html">Staff Paruh Waktu</a></li>'+
   '</ul>'+
   '</li>'+
   '</ul>'+
   '</li>'+

   '</ul>'+
   '</div>'+
   '</div>'+
   '</nav>'+
   breadcrumbs
   );

}


function loadBlogs(group){
  fetch("assets/data/data_blog_petra.json")
  .then(r => r.json())
  .then(function(d) {

    for(var i in d.blogs){
      if (d.blogs[i].group == group) {
        if (d.blogs[i].group == "home") {
          $('#project-slide').trigger('add.owl.carousel', [
            '<div class="item project-wrapper">'+

            '<div class="project-info relative">'+
            '<br>'+
            '<h3>'+
            '<a href="project-detail.html">'+
            '<span>'+d.blogs[i].title+'</span>'+
            '</a>'+
            '</h3>'+
            '<small>'+d.blogs[i].date+'</small>'+
            '<br><br><hr>'+
            '<p>'+d.blogs[i].content+'</p>'+

            '</div>'+
            '</div>'
            ])
        }
        else if (d.blogs[i].group == group) {
          $("#append_contents").append(
            '<section class="project project-detail">'+
            '<div class="container">'+
            '<div class="row blog-special">'+

            '<div class="col-lg-9 mx-auto col-md-11 col-12 my-5 pt-3">'+

            '<h2 class="mb-3">'+d.blogs[i].title+'</h2>'+
            '<small>'+d.blogs[i].date+'</small><br><br>'+

            d.blogs[i].content+

            '</div>'+
            '</div>'+
            '</div>'+
            '</section>'
            )
        }
      }
    }
    $('#project-slide').trigger('refresh.owl.carousel');
  })

}


function loadStaff(group){
  var type = group.toUpperCase();
  if (type == "STAFF")
    type = "Tetap";

  $("#append_staff").append(
    '<section id="team" class="team project" data-aos="fade-up">'+
    '<div class="container">'+

    '<div class="section-title" data-aos="fade-up">'+
    '<h2>Staff <strong>'+type+'</strong></h2>'+
    '<p>Di bawah ini adalah nama-nama dari Staff '+type+' yang bertugas di PTIK</p>'+
    '<br><hr><br>'+
    '</div>'+

    '<div class="row" id="load_staff" data-aos="fade-up">'+
    '</div>'+

    '</div>'+
    '</section>'
    );

  fetch("assets/data/data_staff_petra.json")
  .then(r => r.json())
  .then(function(d) {
    for(var i in d.staff){
      if (d.staff[i].group == group) {
        $("#load_staff").append(
          '<div class="col-lg-3 col-md-6 d-flex align-items-stretch">'+
          '<div class="member">'+
          '<div class="member-img">'+
          '<img src="'+d.staff[i].image+'" class="img-fluid" alt="">'+
          '</div>'+
          '<div class="member-info">'+
          '<h4>'+d.staff[i].nama+'</h4>'+
          '<span>'+d.staff[i].jabatan+'</span>'+
          '</div>'+
          '</div>'+
          '</div>'
          );
      }
    }
  })
}


function loadLinks(){
  fetch("assets/data/data_link_petra.json")
  .then(r => r.json())
  .then(function(d) {

    for(var i in d.links){
      if (d.links[i].group == "important") {
        $("#append_links").append(
          '<div class="col-lg-4 col-md-4 col-12 mb-4">'+
          '<div class="blog-sidebar py-4 d-flex justify-content-left align-items-center">'+
          '<img src="assets/images/web-icon.png" class="img-fluid" alt="blog">'+

          '<div class="blog-info">'+
          '<h4 class="blog-category text-danger">'+d.links[i].group+' LINK</h4>'+

          '<h3><a href="'+d.links[i].href+'">'+d.links[i].title+'</a></h3>'+
          '</div>'+
          '</div>'+
          '</div>'
          )
      }
    }

  })

}


function loadFooter(){
  $("#append_footer").append(
    '<footer class="site-footer">'+
    '<div class="container">'+
    '<div class="row">'+

    '<div class="col-lg-5 mx-lg-auto col-md-8 col-10">'+
    '<h1 class="text-white">PTIK <strong>PETRA</strong></h1>'+
    '<img src="assets/images/petra/logo_petra.png" class="img-fluid" alt="">'+

    '<div style="margin-top: 25px">'+
    '<p class="mb-1">'+
    '<i class="fa fa-home mr-2 footer-icon"></i> '+profile.getAddress()+
    '</p>'+

    '<p class="mb-1">'+
    '<i class="fa fa-phone mr-2 footer-icon"></i> '+profile.getPhone()+
    '</p>'+

    '<p class="mb-1">'+
    '<i class="fa fa-fax mr-2 footer-icon"></i> '+profile.getFax()+
    '</p>'+

    '<p>'+
    '<a href="mailto:'+profile.getEmail()+'">'+
    '<i class="fa fa-envelope mr-2 footer-icon"></i>'+profile.getEmail()+
    '</a>'+
    '</p>'+
    '</div>'+
    '</div>'+

    '<div class="col-lg-3 col-md-6 col-12">'+
    '<h4 class="my-4">Peta & Direktori</h4>'+

    '<p>'+
    '<a href="#">'+
    '<i class="fa fa-arrow-circle-right mr-2 footer-icon"></i> '+
    'Peta Situs'+
    '</a>'+
    '</p>'+

    '<p>'+
    '<a href="#">'+
    '<i class="fa fa-arrow-circle-right mr-2 footer-icon"></i> '+
    'Peta Kampus'+
    '</a>'+
    '</p>'+

    '<p>'+
    '<a href="#">'+
    '<i class="fa fa-arrow-circle-right mr-2 footer-icon"></i> '+
    'Direktori Kantor'+
    '</a>'+
    '</p>'+

    '<br>'+
    '<img src="assets/images/petra/logo_light.png" class="img-fluid" alt="">'+
    '<br>'+
    '<strong style="font-size: .6rem;color: #fff">Love &bull; Integrity &bull; Growth &bull; Humility &bull; Truth</strong>'+
    '</div>'+

    '<div class="col-lg-3 col-md-6 col-12">'+
    '<h4 class="my-4">Link</h4>'+

    '<p>'+
    '<a href="https://webmail.petra.ac.id">'+
    '<i class="fa fa-arrow-circle-right mr-2 footer-icon"></i>'+
    'Webmail'+
    '</a>'+
    '</p>'+

    '<p>'+
    '<a href="http://update.petra.ac.id/">'+
    '<i class="fa fa-arrow-circle-right mr-2 footer-icon"></i>'+
    'Antivirus Update'+
    '</a>'+
    '</p>'+

    '<p>'+
    '<a href="http://puskom.petra.ac.id/tools/dict/dict.php">'+
    '<i class="fa fa-arrow-circle-right mr-2 footer-icon"></i>'+
    'Kamus'+
    '</a>'+
    '</p>'+
    '</div>'+

    '<div class="col-lg-4 mx-lg-auto text-center col-md-8 col-12">'+
    '<p class="copyright-text">&copy; 2020 <strong>Petra Christian University</strong>'+
    '<br>'+
    '<!--<a rel="nofollow noopener" href="https://templatemo.com">Design: TemplateMo</a>-->'+
    '</p>'+
    '</div>'+

    '</div>'+
    '</div>'+
    '</footer>'
    );
}