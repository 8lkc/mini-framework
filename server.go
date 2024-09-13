package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

const (PORT = "8080"; HOSTNAME = "localhost")
func main() {
	http.Handle("/", SPAHandler{http.FileServer(http.Dir("./public"))})
	drawBox(HOSTNAME, PORT)
	checkFailureState("SERVER", http.ListenAndServe(HOSTNAME +":"+ PORT, nil))
}

type SPAHandler struct {staticFileServer http.Handler}
func (h SPAHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    path := r.URL.Path; filePath := filepath.Join("./public", path)
    _, err := os.Stat(filePath); if os.IsNotExist(err) {
        http.ServeFile(w, r, filepath.Join("./public", "index.html")); return
    } else if err != nil {
        w.WriteHeader(http.StatusInternalServerError); return
    }; h.staticFileServer.ServeHTTP(w, r)
}
func checkFailureState(service string, err error) {if err != nil {log.Fatal("\033[1;38;5;208m"+ service, ":", err, "\033[0m")}}
func drawBox(IPAddress string, port string) string {
	IPLenght := len(IPAddress); rightWidth := IPLenght + 15; infoWidth := 22 + rightWidth
	drawRow("─", "─", "─", "\033[1;34m╭", "╮", "─", "─", 8, 25, rightWidth)
	fmt.Print("│ Informations"); for i := 0; i < infoWidth; i++ {fmt.Print(" ")}; fmt.Println("│")
	drawRow("─", "─", "─", "├", "┤", "╥", "─", 8, 25, rightWidth)
	drawRow("Name", "Descript", "Value", "│", "│", "║", " ", 8, 25, rightWidth)
	drawRow("═", "═", "═", "╞", "╡", "╬", "═", 8, 25, rightWidth)
	drawRow("L_HOST", "The listen address", IPAddress, "│", "│", "║", " ", 8, 25, rightWidth)
	drawRow("L_PORT", "The listen port", port, "│", "│", "║", " ", 8, 25, rightWidth)
	url := fmt.Sprintf("http://%v:%v/", IPAddress, port)
	drawRow("URL", "The path to the website", url, "│", "│", "║", " ", 8, 25, rightWidth)
	drawRow("─", "─", "─", "╰", "╯\033[0m", "╨", "─", 8, 25, rightWidth)
	return url
}
func drawRow(
		leftValue string, middleValue string, rightValue string,
		leftBound string, rightBound string, separator string, blankChar string,
		letfWidth int, middleWidth int, rightWidth int,
	) {
	leftLength, middleLength, rightLength := len([]rune(leftValue)), len([]rune(middleValue)), len([]rune(rightValue))
	leftBlank, middleBlank, rightBlank := letfWidth - (leftLength + 1), middleWidth - (middleLength + 1), rightWidth - (rightLength + 1)
	fmt.Printf("%v%v%v", leftBound, blankChar, leftValue); for i := 0; i < leftBlank; i++ {fmt.Printf("%v", blankChar)}
	fmt.Printf("%v%v%v", separator, blankChar, middleValue); for i := 0; i < middleBlank; i++ {fmt.Printf("%v", blankChar)}
	fmt.Printf("%v%v%v", separator, blankChar, rightValue); for i := 0; i < rightBlank; i++ {fmt.Printf("%v", blankChar)}
	fmt.Printf("%v\n", rightBound)
}
