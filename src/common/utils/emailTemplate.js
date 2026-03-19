export const verifyEmailTemplate = (code, title) => `
<!DOCTYPE html><html><head></head>
<body style="background-color:#88BDBF;margin:0">
<table border="0" width="50%" style="margin:auto;padding:30px;background-color:#F3F3F3;border:1px solid #630E2B;">
<tr><td>
<table border="0" width="100%"><tr>
<td><h1><img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/></h1></td>
<td><p style="text-align:right"><a href="#" style="text-decoration:none">View In Website</a></p></td>
</tr></table>
</td></tr>
<tr><td>
<table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color:#fff">
<tr><td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff">
<img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
</td></tr>
<tr><td><h1 style="padding-top:25px;color:#630E2B">${title}</h1></td></tr>
<tr><td><p style="margin:10px 0 30px;border-radius:4px;padding:10px 20px;border:0;color:#fff;background-color:#630E2B;font-size:28px;letter-spacing:6px">${code}</p></td></tr>
</table>
</td></tr>
</table>
</body></html>`;