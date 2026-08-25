const mailGen = () => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Verano Softys</title>
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="
	background-color:rgb(255, 255, 255);
	font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
">
<div style="
	width:100%;
	-webkit-text-size-adjust:none !important;
	margin:0;
	padding: 70px 0 70px 0;
">
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
        <tr>
            <td align="center" valign="top">
                            <!-- Body -->
                            <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                                <img style="max-width: 600px;" src="https://www.veranosoftys.cl/mail.png" alt="Verano Softys" />
</table>
<!-- End Body -->
</td>
</tr>
</table>
</td>
</tr>
</table>
</div>
</body>
</html>`;
};

export default mailGen;
