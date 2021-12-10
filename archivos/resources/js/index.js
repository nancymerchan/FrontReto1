$( document ).ready(function() {
    console.log( "Estas en la página Inicio" );
    init();
});
function init()
{
    $(".confirmacionRegistro").hide();
}
function registrarUsuario()
{
    console.log("Mi boton Registro Funciona");
    ///Variables
    var banderaRegistro = 0;
    ////Recoger los valores de los inputs
    var name = $.trim($("#nombre").val());
    var email = $.trim($("#mail").val());
    var password = $.trim($("#pwd").val());
    var password_r = $.trim($("#pwr_r").val());
    ////
    console.log("name = "+name);
    console.log("email = "+email);
    console.log("password = "+password);
    console.log("password_r = "+password_r);
    ////validación
    var miContador = $('.miFormRegistro input').length;
    console.log("contadorRegistro = "+miContador);

    $('.miFormRegistro input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaRegistro').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaRegistro = banderaRegistro + 1;
        //alert("No estan vacios" + banderaRegistro);
    });
    ////Fin validación
    if(banderaRegistro == miContador)
    {
        if(password != password_r)
        {
            $('.alertaRegistro').html("Los password deben coincidir");
        }
        else
        {
            let myData = {
                email:email,
                password:password,
                name:name
            }
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend);
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://localhost:9090/api/user/new",
                data: dataToSend,
                datatype:"json",
                cache: false,
                timeout: 600000,
                success:function(respuesta){
                    $(".confirmacionRegistro").show();
                    $(".miFormRegistro").hide();
                },
                error : function(e) {
                    alert("No FUNCIONA");
                },
                done : function(e) {
                    alert("No FUNCIONA");
                }
            });
        }
    }

}
function login()
{
    console.log("Mi boton Login Funciona");
    ///Variables
    var banderaLogin = 0;
    ////Recoger los valores de los inputs
    var usuario_login = $.trim($("#usr_login").val());
    var password_login = $.trim($("#pwd_login").val());
    ////
    console.log("usuario_login = "+usuario_login);
    console.log("password_login = "+password_login);
    ////validación
    var miContador = $('.miFormLogin input').length;
    console.log("contadorRegistro = "+miContador);

    $('.miFormLogin input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaLogin').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaLogin = banderaLogin + 1;
        //alert("No estan vacios" + banderaRegistro);
    });
    ////Fin validación
    if(banderaLogin == miContador)
    {
        $.ajax({
            url:"http://localhost:9090/api/user/"+usuario_login+"/"+password_login,
            type: "GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                console.log("nombre Usuario "+respuesta.name);
                if(respuesta.name === "NO DEFINIDO")
                {
                    $("#usr_login").focus();
                    $(".alertaLogin").html("Usuario o contraseña INCORRECTOS");
                }
                else
                {
                    window.location.href = "perfil.html";
                    ///////PASAR INFO de una pagina a otra
                    sessionStorage.setItem("NombreUsuario",respuesta.name);
                }
            }
        });
    }
}
$(document).on("click",".btn_registrarse",function() {
    registrarUsuario();
});
$(document).on("click",".btn_login",function() {
    login();
});