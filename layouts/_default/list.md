# {{ .Title }}

{{ range .Pages }}
- [{{ .Title }}]({{ .Permalink | relURL }}index.md)
{{- end }}