const baseEmail = ({ title, content }) => {
  return `
<!DOCTYPE html>
<html lang="es">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title}</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#edf2f7;
    font-family:Arial,Helvetica,sans-serif;
    padding:30px;
}

.wrapper{
    max-width:700px;
    margin:auto;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    box-shadow:0 10px 35px rgba(0,0,0,.15);
}

.header{

    background:linear-gradient(135deg,#071b4d,#0b2e87,#0d47ff);
    padding:45px;
    text-align:center;

}

.header img{

    width:220px;

}

.content{

    padding:45px;

}

.footer{

    background:#071b4d;
    color:white;
    text-align:center;
    padding:35px;

}

.footer p{

    color:#d8d8d8;
    margin-top:10px;
    font-size:14px;

}

.social{

    margin-bottom:20px;

}

.social img{

    width:42px;
    margin:0 10px;

}

@media(max-width:700px){

.content{

padding:25px;

}

.header{

padding:30px;

}

.header img{

width:180px;

}

}

</style>

</head>

<body>

<div class="wrapper">

<div class="header">

<img src="cid:logo" alt="Spacex Fiber">

</div>

<div class="content">

${content}

</div>

<div class="footer">

<div class="social">

<img src="cid:facebook" alt="Facebook">

<img src="cid:instagram" alt="Instagram">

<img src="cid:whatsapp" alt="WhatsApp">

</div>

<p>

© 2026 <b>Spacex Fiber</b>.<br>

Todos los derechos reservados.

</p>

<p>

Este es un correo automático, por favor no responder.

</p>

</div>

</div>

</body>

</html>
`;
};

export default baseEmail;