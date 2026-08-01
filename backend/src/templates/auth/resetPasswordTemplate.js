import baseEmail from "../layouts/baseEmail.js";

const resetPasswordTemplate = ({ nombre, link }) => {

  const content = `

<div style="text-align:center;">

<img
src="cid:candado"
width="95"
style="margin-bottom:25px;"
>

<h1
style="
font-size:46px;
color:#0B1F4D;
margin-bottom:15px;
">

Hola
<span style="color:#2563eb;">
${nombre}
</span>
👋

</h1>

<div
style="
width:80px;
height:4px;
background:#2563eb;
margin:20px auto;
border-radius:20px;
">
</div>

<p
style="
font-size:25px;
color:#444;
line-height:38px;
margin-top:30px;
">

Recibimos una solicitud para cambiar la contraseña de tu cuenta.

</p>

<p
style="
font-size:22px;
color:#555;
margin-top:15px;
">

Si fuiste tú, puedes restablecerla fácilmente.

</p>

</div>

<br><br>

<div
style="
border:2px solid #dbeafe;
background:#f8fbff;
padding:35px;
border-radius:18px;
">

<table width="100%">

<tr>

<td width="90">

<img
src="cid:sobre"
width="65"
>

</td>

<td>

<h2
style="
color:#142b6f;
margin-bottom:10px;
">

Para restablecer tu contraseña

</h2>

<p
style="
font-size:20px;
line-height:32px;
color:#555;
">

Haz clic en el botón para crear una nueva contraseña de forma segura.

</p>

</td>

</tr>

</table>

<div style="text-align:center;margin-top:35px;">

<a
href="${link}"

style="
display:inline-block;
background:#2563eb;
color:white;
padding:18px 50px;
border-radius:10px;
text-decoration:none;
font-size:22px;
font-weight:bold;
">

🔐 Restablecer contraseña

</a>

</div>

</div>

<br>

<div
style="
background:#f3fff4;
border:2px solid #b7efc5;
padding:25px;
border-radius:15px;
">

<table>

<tr>

<td width="80">

<img
src="cid:reloj"
width="55">

</td>

<td>

<p
style="
font-size:22px;
color:#333;
line-height:34px;
">

Este enlace será válido durante

<b style="color:#16a34a;">

30 minutos

</b>

y solamente podrá utilizarse

<b style="color:#16a34a;">

una vez.

</b>

</p>

</td>

</tr>

</table>

</div>

<br>

<div
style="
background:#fff8ed;
border:2px solid #ffd28a;
padding:25px;
border-radius:15px;
">

<table>

<tr>

<td width="80">

<img
src="cid:escudo"
width="55">

</td>

<td>

<p
style="
font-size:21px;
line-height:34px;
color:#444;
">

Si no solicitaste este cambio,

ignora este correo.

Tu contraseña permanecerá segura.

</p>

</td>

</tr>

</table>

</div>

<hr
style="
margin:45px 0;
border:none;
border-top:1px solid #ddd;
">

<p
style="
font-size:23px;
color:#555;
">

Gracias,

</p>

<p
style="
font-size:24px;
font-weight:bold;
color:#2563eb;
">

El equipo de Spacex Fiber 🚀

</p>

`;

  return baseEmail({
    title: "Recuperación de contraseña",
    content
  });

};

export default resetPasswordTemplate;