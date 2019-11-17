// Compiled using marko@4.18.24 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/curso-node-alura$1.0.0/src/app/views/livros/form/form.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/bootstrap.min.css\"></head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"container\"><header><h1>Cadastro de livros</h1>");

  if (data.errosValidacao) {
    out.w("<div>");

    var $for$0 = 0;

    marko_forEach(data.errosValidacao, function(erro) {
      var $keyScope$0 = "[" + (($for$0++) + "]");

      out.w("<div class=\"alert alert-danger\"><span>" +
        marko_escapeXml(erro.param) +
        " - " +
        marko_escapeXml(erro.msg) +
        "</span></div>");
    });

    out.w("</div>");
  }

  out.w("</header><main><form action=\"/livros/form\" method=\"post\">");

  if (data.livro.id) {
    out.w("<div><input class=\"form-control\" type=\"hidden\" id=\"id\" name=\"id\"" +
      marko_attr("value", "" + data.livro.id) +
      "><input class=\"form-control\" type=\"hidden\" name=\"_method\" value=\"PUT\"></div>");
  }

  out.w("<div class=\"form-group\"><label for=\"titulo\">Titulo:</label><input class=\"form-control\" type=\"text\" id=\"titulo\" name=\"titulo\"" +
    marko_attr("value", "" + data.livro.titulo) +
    " placeholder=\"Titulo\"></div><div class=\"form-group\"><label for=\"capa\">Capa:</label><input class=\"form-control\" type=\"file\" id=\"capa\" name=\"capa\" placeholder=\"imagem de capa\"></div><div class=\"form-group\"><label for=\"preco\">Preço:</label><input class=\"form-control\" type=\"text\" id=\"preco\" name=\"preco\" placeholder=\"150.25\"" +
    marko_attr("value", "" + data.livro.preco) +
    "></div><div class=\"form-group\"><label for=\"descricao\">Descrição:</label><textarea class=\"form-control\" cols=\"20\" rows=\"10\" id=\"descricao\" name=\"descricao\" placeholder=\"fale sobre o livro\">" +
    marko_escapeXml(data.livro.descricao) +
    "</textarea></div><input class=\"form-control\" type=\"submit\" value=\"Salvar\"></form></main></div><script src=\"/estatico/js/jquery-3.3.1.slim.min.js\"></script><script src=\"/estatico/js/popper.min.js\"></script><script src=\"/estatico/js/bootstrap.min.js\"></script><script src=\"/estatico/js/remove-livro.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "29");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/curso-node-alura$1.0.0/src/app/views/livros/form/form.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
