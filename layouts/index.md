# {{ .Site.Title }}

{{ range .Site.RegularPages }}
- [{{ .Title }}]({{ .Permalink | relURL }}index.md)
{{- end }}