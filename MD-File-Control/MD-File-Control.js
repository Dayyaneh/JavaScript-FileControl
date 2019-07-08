const FileTypes = {
    Image: "IMG",
    Excel: "EXCEL",
    Word: "WORD",
    PDF: "PDF",
    PSD: "PSD",
    AI: "AI",
    POWERPOINT: "POWERPOINT",
    Audio: "AUDIO",
    Video: "VIDEO",
    Text: "TXT",
    HTML: "HTML",
    All: "ALL"
};

class MDFileControl {
    /*----------------------------------------------------------------------------------------------------------------*/
    #props = {
        document: null,
        container: null,
        fileType: FileTypes.All,
        maxFileSize: null,
        placeHolder: '',
    };
    #controls = {
        imgPreview: null,
        edbFileName: null,
        btnFile: null,
        btnFilePicker: null,
        btnReset: null,
        pnlPreviewOverlay: null,
        lblFileSizeCaption: null,
        lblFileSizeValue: null,
    };
    #constant = {
        uid: null,
        fileSizeExceedMessage: 'The file size is exceeded from maximum file size',
        loadingFileFailedMessage: 'Can not load selected file',
        fileSizeCaption: 'The file size is :',
        warningPicture: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyOTQuOTUxIDI5NC45NTEiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5NC45NTEgMjk0Ljk1MSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnPjxzY3JpcHQgeG1sbnM9IiIgY2xhc3M9ImFjdGl2ZS1wYXRoIj48L3NjcmlwdD48Zz4KICAgIDxnPgogICAgICA8cGF0aCBkPSJtMTQ3LjQ3NSwxMDMuMTAyYy01LjIyLDAtOC43MDEsMy40OC04LjcwMSw4LjcwMXY2Mi42NDRjMCw1LjIyIDMuNDgsOC43MDEgOC43MDEsOC43MDEgNS4yMiwwIDguNzAxLTMuNDggOC43MDEtOC43MDF2LTYyLjY0NGMwLTUuMjIxLTMuNDgxLTguNzAxLTguNzAxLTguNzAxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIj48L3BhdGg+CiAgICAgIDxwYXRoIGQ9Im0xNTIuNjk1LDIxMi43M2MtMy40OC0zLjQ4LTguNzAxLTMuNDgtMTIuMTgxLDAtMS43NCwxLjc0LTEuNzQsNS4yMi0xLjc0LDYuOTYgMCwzLjQ4IDAsNS4yMiAxLjc0LDYuOTYgMS43NCwxLjc0IDUuMjIsMS43NCA2Ljk2LDEuNzQgMS43NCwwIDUuMjIsMCAzLjQ4LTEuNzQgMS43NC0xLjc0IDMuNDgtNS4yMiAzLjQ4LTYuOTYgMC4wMDItMy40OCAwLjAwMi01LjIyLTEuNzM5LTYuOTZ6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiPjwvcGF0aD4KICAgICAgPHBhdGggZD0ibTI4OC40MjUsMjE0LjQ3bC0xMDIuNjY3LTE3OS4yMzJjLTYuOTYtMTMuOTIxLTIyLjYyMS0yMi42MjEtMzguMjgzLTIyLjYyMS0xNS42NjEsMC0yOS41ODIsOC43MDEtMzguMjgzLDIyLjYyMWwtMTAyLjY2NywxNzkuMjMyYy04LjcwMSwxMy45MjEtOC43MDEsMzEuMzIyLTUuMzI5MDdlLTE1LDQ1LjI0MyA2Ljk2LDEzLjkyMSAyMi42MjEsMjIuNjIxIDM4LjI4MywyMi42MjFoMjA1LjMzNGMxNy40MDEsMCAzMS4zMjItOC43MDEgMzguMjgzLTIyLjYyMSA4LjcwMS0xMy45MjEgOC43MDEtMzEuMzIyIDAtNDUuMjQzem0tMTMuOTIxLDM4LjI4M2MtMy40OCw4LjcwMS0xMi4xODEsMTMuOTIxLTIyLjYyMSwxMy45MjFoLTIwNy4wNzVjLTguNzAxLDAtMTcuNDAxLTUuMjItMjIuNjIxLTEzLjkyMS01LjIyLTguNzAxLTUuMjItMTkuMTQxIDAtMjcuODQybDEwMi42NjctMTc5LjIzM2MzLjQ4LTguNzAxIDEyLjE4MS0xMy45MjEgMjIuNjIxLTEzLjkyMSAxMC40NDEsMCAxOS4xNDEsNS4yMiAyNC4zNjIsMTMuOTIxbDEwMi42NjcsMTc5LjIzMmM1LjIyMSw4LjcwMSA1LjIyMSwxOS4xNDIgMCwyNy44NDN6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiPjwvcGF0aD4KICAgIDwvZz4KICA8L2c+PC9nPiA8L3N2Zz4=',
        emptyPictureForImagePicking: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDQgNTA0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDQgNTA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0YwQjU1MTsiIGQ9Ik04NCw4MHYyNTUuMmMwLDYuNCwxMC40LDE0LjgsMTYuOCwxNC44aDM5MmM2LjQsMCwxMS4yLTguNCwxMS4yLTE0LjhWODUuNmMwLTcuNi05LjItMTkuNi0xNi44LTE5LjYgIEgxMDAuOEM5NC40LDY2LDg0LDczLjYsODQsODB6Ii8+CjxyZWN0IHg9IjEwMCIgeT0iOTQiIHN0eWxlPSJmaWxsOiNBQ0Q5RUE7IiB3aWR0aD0iMzc2IiBoZWlnaHQ9IjIzMiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRURDNjU0OyIgZD0iTTQsMTYwLjR2MjYyLjRjMCw2LjgsNi40LDExLjIsMTMuMiwxMS4yaDQwNy42YzYuOCwwLDExLjItNC40LDExLjItMTEuMlYxNjJjMC03LjYtNS42LTE2LTEzLjItMTYgIGgtNDA2QzEwLjQsMTQ2LDQsMTUzLjYsNCwxNjAuNHoiLz4KPHJlY3QgeD0iMjgiIHk9IjE3MCIgc3R5bGU9ImZpbGw6I0NERUVGOTsiIHdpZHRoPSIzODAiIGhlaWdodD0iMjM2Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMzQzhFNTE7IiBkPSJNMTc1LjYsMjI2LjRMMTE0LjgsMjkwTDg2LDI2MC44bC01MS42LDUwYy0wLjQsMC40LDAsOTUuMiwwLDk1LjJINDA4di04MC40bC02Ni02NS4ybC02NCw2Ni40ICBMMTc1LjYsMjI2LjR6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1NEIyNjU7IiBkPSJNMTc1LjYsMjI2bC02MC44LDYzLjJMMjI5LjIsNDA2aDEzMC40TDE3NS42LDIyNnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0U4QkI4NTsiIGQ9Ik04Mi40LDI2MC40bC01MS42LDUwLjRjLTAuNCwwLjQsMCw5NS42LDAsOTUuNmgyMDAuOEw4Mi40LDI2MC40eiIvPgo8ZWxsaXBzZSBzdHlsZT0iZmlsbDojRTlCNTI2OyIgY3g9IjI3My4yIiBjeT0iMjI1LjYiIHJ4PSIyMC40IiByeT0iMjAuOCIvPgo8cGF0aCBkPSJNNDE4LjQsNDM4SDE3LjZDOCw0MzgsMCw0MzAsMCw0MjAuNFYxNTkuNkMwLDE1MCw4LDE0MiwxNy42LDE0Mmg0MDAuOGM5LjYsMCwxNy42LDgsMTcuNiwxNy42djI2MC44ICBDNDM2LDQzMCw0MjgsNDM4LDQxOC40LDQzOHogTTE3LjYsMTUwYy01LjIsMC05LjYsNC40LTkuNiw5LjZ2MjYwLjhjMCw1LjIsNC40LDkuNiw5LjYsOS42aDQwMC44YzUuMiwwLDkuNi00LjQsOS42LTkuNmwwLDBWMTU5LjYgIGMwLTUuMi00LjQtOS42LTkuNi05LjZMMTcuNiwxNTBMMTcuNiwxNTB6Ii8+CjxwYXRoIGQ9Ik00MDgsNDE0SDI4Yy0yLjQsMC00LTEuNi00LTRWMTcwYzAtMi40LDEuNi00LDQtNGgzMjhjMi40LDAsNCwxLjYsNCw0cy0xLjYsNC00LDRIMzJ2MjMyaDM3MlYxNzRoLTEyYy0yLjQsMC00LTEuNi00LTQgIHMxLjYtNCw0LTRoMTZjMi40LDAsNCwxLjYsNCw0djI0MEM0MTIsNDEyLjQsNDEwLjQsNDE0LDQwOCw0MTR6Ii8+CjxwYXRoIGQ9Ik00ODguOCwzNThoLTU2Yy0yLjQsMC00LTEuNi00LTRzMS42LTQsNC00aDU2YzUuNiwwLDcuMi02LjgsNy4yLTEwLjhWODEuNmMwLTYuOC02LTcuNi04LjgtNy42SDkyLjhjLTUuNiwwLTguOCw1LjItOC44LDEwICB2NThjMCwyLjQtMS42LDQtNCw0cy00LTEuNi00LTRWODRjMC0xMCw3LjYtMTgsMTYuOC0xOGgzOTQuNGMxMCwwLDE2LjgsNi40LDE2LjgsMTUuNnYyNTcuNkM1MDQsMzUwLjQsNDk3LjYsMzU4LDQ4OC44LDM1OHoiLz4KPHBhdGggZD0iTTEwNCwxNDZjLTIuNCwwLTQtMS42LTQtNFY5NGMwLTIuNCwxLjYtNCw0LTRoMzI4YzIuNCwwLDQsMS42LDQsNHMtMS42LDQtNCw0SDEwOHY0NEMxMDgsMTQ0LjQsMTA2LjQsMTQ2LDEwNCwxNDZ6Ii8+CjxwYXRoIGQ9Ik00NzYsMzM0aC00MGMtMi40LDAtNC0xLjYtNC00czEuNi00LDQtNGgzNlY5OGgtMTJjLTIuNCwwLTQtMS42LTQtNHMxLjYtNCw0LTRoMTZjMi40LDAsNCwxLjYsNCw0djIzNiAgQzQ4MCwzMzIuNCw0NzguNCwzMzQsNDc2LDMzNHoiLz4KPHBhdGggZD0iTTI4LDMyMGMtMS4yLDAtMi0wLjQtMi44LTEuMmMtMS42LTEuNi0xLjYtNCwwLTUuNkw4MiwyNTYuNGMxLjYtMS42LDQtMS42LDUuNiwwYzEuNiwxLjYsMS42LDQsMCw1LjZsLTU2LjgsNTYuOCAgQzMwLDMxOS42LDI5LjIsMzIwLDI4LDMyMHoiLz4KPHBhdGggZD0iTTE2NC44LDM0My4yYy0xLjIsMC0yLTAuNC0yLjgtMS4ybC04MC04MGMtMS42LTEuNi0xLjYtNCwwLTUuNmMxLjYtMS42LDQtMS42LDUuNiwwbDc5LjYsNzkuNmMxLjYsMS42LDEuNiw0LDAsNS42ICBDMTY2LjgsMzQyLjgsMTY1LjYsMzQzLjIsMTY0LjgsMzQzLjJ6Ii8+CjxwYXRoIGQ9Ik0xMjkuMiwyODMuMmMtMS4yLDAtMi0wLjQtMi44LTEuMmMtMS42LTEuNi0xLjYtNCwwLTUuNmw1MS42LTUxLjZjMS42LTEuNiw0LTEuNiw1LjYsMHMxLjYsNCwwLDUuNkwxMzIsMjgyICBDMTMxLjIsMjgyLjgsMTMwLDI4My4yLDEyOS4yLDI4My4yeiIvPgo8cGF0aCBkPSJNMjg5LjIsMzE1LjJjLTEuMiwwLTItMC40LTIuOC0xLjJjLTEuNi0xLjYtMS42LTQsMC01LjZsNTItNTJjMS42LTEuNiw0LTEuNiw1LjYsMGMxLjYsMS42LDEuNiw0LDAsNS42bC01Miw1MiAgQzI5MS4yLDMxNC44LDI5MCwzMTUuMiwyODkuMiwzMTUuMnoiLz4KPHBhdGggZD0iTTMxMCwzNjAuOGMtMS4yLDAtMi0wLjQtMi44LTEuMkwxNzgsMjMwYy0xLjYtMS42LTEuNi00LDAtNS42czQtMS42LDUuNiwwbDEyOS4yLDEyOS4yYzEuNiwxLjYsMS42LDQsMCw1LjYgIEMzMTIsMzYwLjQsMzExLjIsMzYwLjgsMzEwLDM2MC44eiIvPgo8cGF0aCBkPSJNNDA3LjIsMzI5LjJjLTEuMiwwLTItMC40LTIuOC0xLjJsLTY2LTY2Yy0xLjYtMS42LTEuNi00LDAtNS42YzEuNi0xLjYsNC0xLjYsNS42LDBsNjYsNjZjMS42LDEuNiwxLjYsNCwwLDUuNiAgQzQwOS4yLDMyOC44LDQwOCwzMjkuMiw0MDcuMiwzMjkuMnoiLz4KPHBhdGggZD0iTTI3My4yLDI1MS4yYy0xMy4yLDAtMjQtMTAuOC0yNC0yNHMxMC44LTI0LDI0LTI0YzUuMiwwLDEwLDEuNiwxNCw0LjRjMiwxLjIsMi40LDMuNiwwLjgsNS42Yy0xLjIsMi0zLjYsMi40LTUuNiwwLjggIGMtMi44LTItNi0yLjgtOS4yLTIuOGMtOC44LDAtMTYsNy4yLTE2LDE2czcuMiwxNiwxNiwxNnMxNi03LjIsMTYtMTZjMC0yLjQsMS42LTQsNC00czQsMS42LDQsNCAgQzI5Ny4yLDI0MC40LDI4Ni40LDI1MS4yLDI3My4yLDI1MS4yeiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        folderPicker: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTAgNTEwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTAgNTEwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0U5QjUyNjsiIGQ9Ik01MDUuOTg0LDE2NC42NDZ2LTIzLjY5M2MwLTI1LjI5OS0xOC44NzQtNDQuNTc1LTQ0LjE3My00NC41NzVoLTE4OC43NGwwLDBsMCwwbDAsMGwwLDAgIGMtMC40MDIsMC0wLjQwMiwwLTAuODAzLDBjLTAuNDAyLDAtMC44MDMtMC40MDItMC44MDMtMC44MDNsLTQzLjM3LTQzLjM3SDU2LjIyYy0yNi41MDQsMC00OC41OTEsMTkuNjc3LTQ4LjU5MSw0NC4xNzN2NjguMjY4ICBINTA1Ljk4NHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0NDQ0NDQzsiIGQ9Ik0yNzMuMDcxLDk2LjM3OEwyNzMuMDcxLDk2LjM3OEwyNzMuMDcxLDk2LjM3OHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0U4QkI4NTsiIGQ9Ik00NjEuODExLDEzMC41MTJMNTYuNjIyLDEzMi41MmMtMjUuMjk5LDAtNTIuMjA1LDE5LjY3Ny01Mi4yMDUsNDQuOTc2ICBjMCwwLjQwMiwyLjQwOSwyLjAwOCwyLjQwOSwyLjAwOGMtMC40MDIsMC40MDIsMC40MDIsMC40MDItMC40MDIsMC40MDJsLTAuNDAyLDAuNDAyTDguNDMxLDQwNS4xOSAgYzAsMjUuMjk5LDIyLjg5LDQ4LjE4OSw0OC41OTEsNDguMTg5aDQwNS4xODljMjQuNDk2LDAsNDQuMTczLTIxLjY4NSw0NC4xNzMtNDguMTg5VjE3Ny40OTZ2LTE0LjA1NSAgQzUwMC4zNjIsMTQ0LjU2Nyw0ODIuNjkzLDEzMC41MTIsNDYxLjgxMSwxMzAuNTEyeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRUY5MzRBOyIgZD0iTTIwMy41OTgsMTc5LjEwMmMtMS4yMDUtMS4yMDUtMi44MTEtMi40MDktNC44MTktMi40MDlINjIuMjQ0Yy0yLjAwOCwwLTQuMDE2LDEuMjA1LTUuMjIsMi44MTEgIGMtMC40MDIsMC44MDMtMC44MDMsMi4wMDgtMC44MDMsMy4yMTN2MjQuMDk0YzAsMy4yMTMsMi44MTEsNi4wMjQsNi4wMjQsNi4wMjRIMTk4Ljc4YzMuMjEzLDAsNi4wMjQtMi44MTEsNi4wMjQtNi4wMjR2LTI0LjA5NCAgQzIwNC44MDMsMTgxLjExLDIwNC40MDIsMTc5LjkwNSwyMDMuNTk4LDE3OS4xMDJ6Ii8+CjxwYXRoIGQ9Ik00NjEuODExLDQ2MS44MTFINTYuNjIyQzI3LjcwOSw0NjEuODExLDAsNDM0LjUwNCwwLDQwNS41OTFWOTYuMzc4YzAtMjkuNzE3LDI5LjMxNS00OC4xODksNTYuNjIyLTQ4LjE4OWgxNzIuNjc3ICBjMS4yMDUsMCwyLjAwOCwwLjQwMiwyLjgxMSwxLjIwNWw0Mi45NjgsNDIuOTY5SDQ2MS44MWMyOC45MTMsMCw0OC4xODksMTkuMjc2LDQ4LjE4OSw0OC41OTF2MjY0LjYzOCAgQzUxMCw0MzIuNDk2LDQ5MS41MjgsNDYxLjgxMSw0NjEuODExLDQ2MS44MTF6IE01Ni42MjIsNTYuMjJjLTIzLjI5MSwwLTQ4LjU5MSwxNS4yNi00OC41OTEsNDAuMTU3VjQwNS41OSAgYzAsMjQuNDk2LDI0LjA5NCw0OC4xODksNDguNTkxLDQ4LjE4OWg0MDUuMTg5YzI0Ljg5OCwwLDQwLjE1Ny0yNC44OTgsNDAuMTU3LTQ4LjE4OVYxNDAuOTUzYzAtMjQuMDk0LTE2LjA2My00MC41NTktNDAuMTU3LTQwLjU1OSAgSDI3My44NzRjLTAuODAzLDAtMS42MDYsMC0yLjQwOS0wLjQwMnMtMS4yMDUtMC44MDMtMS42MDYtMS4yMDVMMjI3LjI5MSw1Ni4yMkg1Ni42MjJ6Ii8+CjxwYXRoIGQ9Ik00LjAxNiwxODQuNzI0Yy0yLjQwOSwwLTQuMDE2LTEuNjA2LTQuMDE2LTQuMDE2YzAtMjguOTEzLDIzLjY5My01Mi4yMDUsNTIuNjA2LTUyLjIwNWgzNDguOTY4ICBjMi40MDksMCw0LjAxNiwxLjYwNiw0LjAxNiw0LjAxNnMtMS42MDYsNC4wMTYtNC4wMTYsNC4wMTZINTIuNjA2Yy0yNC40OTYsMC00NC41NzUsMTkuNjc3LTQ0LjU3NSw0NC4xNzMgIEM4LjAzMSwxODMuMTE4LDYuNDI1LDE4NC43MjQsNC4wMTYsMTg0LjcyNHoiLz4KPHBhdGggZD0iTTUwNS45ODQsMTc5LjEwMmMtMi40MDksMC00LjAxNi0xLjYwNi00LjAxNi00LjAxNmMwLTI0LjA5NC0xNi4wNjMtNDAuNTU5LTQwLjE1Ny00MC41NTljLTIuNDA5LDAtNC4wMTYtMS42MDYtNC4wMTYtNC4wMTYgIHMxLjYwNi00LjAxNiw0LjAxNi00LjAxNmMyOC41MTIsMCw0OC4xODksMjAuMDc5LDQ4LjE4OSw0OC41OTFDNTEwLDE3Ny40OTYsNTA4LjM5NCwxNzkuMTAyLDUwNS45ODQsMTc5LjEwMnoiLz4KPHBhdGggZD0iTTE5Ni43NzIsMjIwLjg2Nkg2MC4yMzZjLTYuODI3LDAtMTIuMDQ3LTUuMjItMTIuMDQ3LTEyLjA0N3YtMjQuMDk0YzAtNi44MjcsNS4yMi0xMi4wNDcsMTIuMDQ3LTEyLjA0N2gxMzYuNTM1ICBjNi44MjcsMCwxMi4wNDcsNS4yMiwxMi4wNDcsMTIuMDQ3djI0LjA5NEMyMDguODE5LDIxNS42NDYsMjAzLjU5OCwyMjAuODY2LDE5Ni43NzIsMjIwLjg2NnogTTYwLjIzNiwxODAuNzA5ICBjLTIuNDA5LDAtNC4wMTYsMS42MDYtNC4wMTYsNC4wMTZ2MjQuMDk0YzAsMi40MDksMS42MDYsNC4wMTYsNC4wMTYsNC4wMTZoMTM2LjUzNWMyLjQwOSwwLDQuMDE2LTEuNjA2LDQuMDE2LTQuMDE2di0yNC4wOTQgIGMwLTIuNDA5LTEuNjA2LTQuMDE2LTQuMDE2LTQuMDE2SDYwLjIzNnoiLz4KPHBhdGggZD0iTTIwOC44MTksMjQ4Ljk3Nkg1Ni4yMmMtMi40MDksMC00LjAxNi0xLjYwNi00LjAxNi00LjAxNnMxLjYwNi00LjAxNiw0LjAxNi00LjAxNmgxNTIuNTk4YzIuNDA5LDAsNC4wMTYsMS42MDYsNC4wMTYsNC4wMTYgIFMyMTEuMjI4LDI0OC45NzYsMjA4LjgxOSwyNDguOTc2eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        resetButtonIcon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDguNCA1MDguNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTA4LjQgNTA4LjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojQUVCMUI0OyIgZD0iTTEwOC44LDQ1My4yYzIsMjUuNiwyNC44LDQ3LjIsNDkuNiw0Ny4yaDIwNGMyNC44LDAsNDcuNi0yMS42LDQ5LjItNDcuMmwxNi44LTMzNi44SDgwLjggIEwxMDguOCw0NTMuMnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0UzNkQ2MDsiIGQ9Ik00NDcuMiwxMTIuNGMwLTYsMC0xNC40LDAtMjZjMC0xNS4yLTEyLjQtMjYtMjkuMi0yNkg5MGMtMTUuNiwwLTMxLjIsMTAtMzEuMiwyNnYyNkg0NDcuMnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0NDQ0NDQzsiIGQ9Ik01NC40LDExNC40YzAsMS4yLDAsMiwwLDJoMkM1NS4yLDExNi40LDU0LjQsMTE1LjYsNTQuNCwxMTQuNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0UzNkQ2MDsiIGQ9Ik0xNzUuMiw0Mi44bC0zLjYsMTUuNmgxNjUuMmwtMy42LTE1LjZjLTQuOC0yMC0yNS42LTM2LjQtNDYuOC0zNi40aC02NCAgQzIwMC44LDYuNCwxODAsMjIuOCwxNzUuMiw0Mi44eiIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojQ0NDQ0NDOyIgcG9pbnRzPSIzNDAuOCw1Ni40IDE3NS4yLDU2LjQgMTc1LjIsNTYuNCAzNDEuMiw1Ny4yIDM0MS4yLDU3LjIgIi8+CjxwYXRoIGQ9Ik0zNjIuNCw1MDguNGgtMjA0Yy0yOCwwLTUzLjItMjQuNC01NS42LTUzLjZMNzUuMiwxMTkuMmMwLTIuNCwxLjYtNCwzLjYtNC40YzIuNCwwLDQsMS42LDQuNCwzLjZMMTEwLjgsNDU0ICBjMiwyNS4yLDIzLjYsNDYsNDcuNiw0NmgyMDRjMjQsMCw0NS42LTIxLjIsNDcuMi00NmwxNi44LTMzNy4yYzAtMi40LDItNCw0LTMuNmMyLjQsMCw0LDIsMy42LDRsLTE2LjgsMzM3LjYgIEM0MTUuNiw0ODQsMzkwLjQsNTA4LjQsMzYyLjQsNTA4LjR6Ii8+CjxwYXRoIGQ9Ik00NTAsMTIwSDU4Yy0yLjQsMC00LTEuNi00LTRWODZjMC0xOS42LDIwLTMwLDM5LjItMzBoMzI4YzIwLjQsMCwzMy4yLDExLjYsMzMuMiwzMHYzMEM0NTQsMTE4LDQ1Mi40LDEyMCw0NTAsMTIweiBNNjIsMTEyICBoMzg0Vjg2YzAtMTQtOS4yLTIyLTI1LjItMjJoLTMyOGMtMTUuMiwwLTMxLjIsNy42LTMxLjIsMjJ2MjZINjJ6Ii8+CjxwYXRoIGQ9Ik0zMzguOCw2MC44Yy0yLDAtMy42LTEuMi00LTMuMmwtNC0xNmMtNC40LTE5LjItMjQtMzQtNDUuMi0zNGgtNjRjLTIwLjgsMC00MC44LDE0LjgtNDUuMiwzNGwtNCwxNS4yICBjLTAuNCwyLTIuOCwzLjYtNC44LDIuOGMtMi0wLjQtMy42LTIuOC0yLjgtNC44bDQtMTQuOGM1LjItMjIuNCwyOC40LTQwLDUyLjgtNDBoNjRjMjQuNCwwLDQ3LjYsMTcuNiw1Mi44LDQwbDQsMTYgIGMwLjQsMi0wLjgsNC40LTIuOCw0LjhDMzM5LjYsNjAuOCwzMzkuMiw2MC44LDMzOC44LDYwLjh6Ii8+CjxwYXRoIGQ9Ik0yNTAuOCw0NzJjLTIuNCwwLTQtMS42LTQtNFYyMzJjMC0yLjQsMS42LTQsNC00czQsMS42LDQsNHYyMzZDMjU0LjgsNDcwLDI1My4yLDQ3MiwyNTAuOCw0NzJ6Ii8+CjxwYXRoIGQ9Ik0yNTAuOCwyMDhjLTIuNCwwLTQtMS42LTQtNHYtNTZjMC0yLjQsMS42LTQsNC00czQsMS42LDQsNHY1NkMyNTQuOCwyMDYsMjUzLjIsMjA4LDI1MC44LDIwOHoiLz4KPHBhdGggZD0iTTE3Ny42LDQ3MmMtMiwwLTQtMS42LTQtNGwtMTItMzIwYzAtMi40LDEuNi00LDQtNHM0LDEuNiw0LDRsMTIsMzIwQzE4Miw0NzAsMTgwLDQ3MiwxNzcuNiw0NzJDMTc4LDQ3MiwxNzgsNDcyLDE3Ny42LDQ3MnogICIvPgo8cGF0aCBkPSJNMzI5LjYsNDcyQzMyOS4yLDQ3MiwzMjkuMiw0NzIsMzI5LjYsNDcyYy0yLjQsMC00LTItNC00bDgtMjEyYzAtMi40LDItNCw0LTRjMi40LDAsNCwyLDQsNGwtOCwyMTIgIEMzMzMuMiw0NzAuNCwzMzEuNiw0NzIsMzI5LjYsNDcyeiIvPgo8cGF0aCBkPSJNMzM4LjgsMjMyLjRMMzM4LjgsMjMyLjRjLTIuNCwwLTQtMi00LTRsMy4yLTgwLjhjMC0yLjQsMi00LDQtNGMyLjQsMCw0LDIsNCw0bC0zLjIsODAuOCAgQzM0Mi44LDIzMC44LDM0MC44LDIzMi40LDMzOC44LDIzMi40eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K',
    };
    #chosenFile = null;
    /*----------------------------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------|Initiate Methods|-----------------------------------------------*/
    /*----------------------------------------------------------------------------------------------------------------*/
    constructor(document, container) {
        this.#props.container = container;
        this.#props.document = document;
        this.#constant.uid = this.generateGuid();
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    initiateControl(placeHolder, fileType, maxFileSize) {
        this.#props.placeHolder = placeHolder;
        this.#props.fileType = fileType;
        this.#props.maxFileSize = maxFileSize;
        this.#props.container.innerHTML = this.render();
        this.initiateElements();
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    initiateElements() {
        try {
            this.#controls.imgPreview = this.#props.document.getElementById('imgPreview-' + this.#constant.uid);
            this.#controls.edbFileName = this.#props.document.getElementById('edbFileName-' + this.#constant.uid);
            this.#controls.btnFile = this.#props.document.getElementById('btnFile-' + this.#constant.uid);
            this.#controls.btnFilePicker = this.#props.document.getElementById('btnFilePicker-' + this.#constant.uid);
            this.#controls.btnReset = this.#props.document.getElementById('btnReset-' + this.#constant.uid);
            this.#controls.pnlPreviewOverlay = this.#props.document.getElementById('pnlPreviewOverlay-' + this.#constant.uid);
            this.#controls.lblFileSizeCaption = this.#props.document.getElementById('lblFileSizeCaption-' + this.#constant.uid);
            this.#controls.lblFileSizeValue = this.#props.document.getElementById('lblFileSizeValue-' + this.#constant.uid);
            this.#controls.btnReset.style.backgroundImage = 'url("' + this.#constant.resetButtonIcon + '")';
            this.#controls.btnFilePicker.style.backgroundImage = 'url("' + this.#constant.folderPicker + '")';

            this.#controls.imgPreview.src = this.#constant.emptyPictureForImagePicking;

            this.InitiateEvent();
            return true;
        } catch (ex) {
            return false;
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------*/
    InitiateEvent() {
        try {
            this.#controls.btnFilePicker.onclick = this.btnFile_onClick.bind(this);
            this.#controls.btnReset.onclick = this.btnReset_onClick.bind(this);
            this.#controls.btnFile.onchange = this.edbFile_onChange.bind(this);
            return true;
        } catch (ex) {
            return false;
        }
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------------|Methods|----------------------------------------------------*/
    /*----------------------------------------------------------------------------------------------------------------*/
    generateGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    getAcceptFileQuery() {
        if (this.#props.fileType === FileTypes.Image)
            return "image/*";
        else if (this.#props.fileType === FileTypes.PDF)
            return "application/pdf";
        else if (this.#props.fileType === FileTypes.Word)
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        else if (this.#props.fileType === FileTypes.Excel)
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        else if (this.#props.fileType === FileTypes.Audio)
            return "audio/*";
        else if (this.#props.fileType === FileTypes.Video)
            return "video/*";
        else if (this.#props.fileType === FileTypes.Text)
            return "text/plain";
        else if (this.#props.fileType === FileTypes.HTML)
            return "text/html";
        else if (this.#props.fileType === FileTypes.All)
            return "";
        else
            return "";
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    FormatBytes = (bytes, decimals) => {
        if (bytes === 0) return '0 Byte';
        const k = 1024;
        const dm = decimals + 1 || 3;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    getFileName = fullPath => {
        try {
            const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            let filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            return filename;
        } catch (ex) {
            return "";
        }
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    getFileExtension = filename => {
        try {
            return filename.split('.').pop();
        } catch (ex) {
            return '';
        }
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    getFileIconURL = fileType => {
        if (fileType === FileTypes.AI)
            return 'General/FileControl/img/ai.png';
        else if (fileType === FileTypes.PDF)
            return 'General/FileControl/img/pdf.png';
        else if (fileType === FileTypes.Excel)
            return 'General/FileControl/img/xls.png';
        else if (fileType === FileTypes.Word)
            return 'General/FileControl/img/doc.png';
        else if (fileType === FileTypes.Audio)
            return 'General/FileControl/img/mp3.png';
        else if (fileType === FileTypes.Video)
            return 'General/FileControl/img/mov.png';
        else if (fileType === FileTypes.Text)
            return 'General/FileControl/img/txt.png';
        else if (fileType === FileTypes.HTML)
            return 'General/FileControl/img/html.png';
        else if (fileType === FileTypes.PSD)
            return 'General/FileControl/img/psd.png';
        else if (fileType === FileTypes.AI)
            return 'General/FileControl/img/ai.png';
        else if (fileType === FileTypes.POWERPOINT)
            return 'General/FileControl/img/ppt.png';
        else
            return 'General/FileControl/img/unknown.png';
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    getBinaryType = FileBinary => {
        if (FileBinary.startsWith("data:application/pdf;base64") === true)
            return FileTypes.PDF;
        else if (FileBinary.startsWith('data:text/plain;base64') === true)
            return FileTypes.Text;
        else if (FileBinary.startsWith('data:application/vnd.ms-excel;base64') === true)
            return FileTypes.Excel;
        else if (FileBinary.startsWith('data:application/vnd.ms-excel.sheet.macroEnabled.12;base64') === true)
            return FileTypes.Excel;
        else if (FileBinary.startsWith('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64') === true)
            return FileTypes.Excel;
        else if (FileBinary.startsWith('data:application/msword;base64') === true)
            return FileTypes.Word;
        else if (FileBinary.startsWith('data:application/vnd.ms-word.document.macroEnabled.12;base64') === true)
            return FileTypes.Word;
        else if (FileBinary.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64') === true)
            return FileTypes.Word;
        else if (FileBinary.startsWith('data:image/svg+xml;base64') === true)
            return FileTypes.Image;
        else if (FileBinary.startsWith('data:;base64') === true)
            return FileTypes.PSD;
        else if (FileBinary.startsWith("data:image/tiff;base64") === true)
            return FileTypes.Image;
        else if (FileBinary.startsWith("data:application/postscript;base64") === true)
            return FileTypes.AI;
        else if (FileBinary.startsWith("data:application/vnd.ms-powerpoint;base64") === true)
            return FileTypes.POWERPOINT;
        else if (FileBinary.startsWith("data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64") === true)
            return FileTypes.POWERPOINT;
        else if (FileBinary.startsWith("data:image/png;base64") === true)
            return FileTypes.Image;
        else if (FileBinary.startsWith("data:image/jpeg;base64") === true)
            return FileTypes.Image;
        else if (FileBinary.startsWith("data:image/gif;base64") === true)
            return FileTypes.Image;
        else if (FileBinary.startsWith("data:image/bmp;base64") === true)
            return FileTypes.Image;
        else
            return '';
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    generateFileObject = (FileId, Binary, FileName, Extension, FileType, URL) => ({
        binary: Binary,
        fileName: FileName,
        extension: Extension,
        fileId: FileId,
        fileType: FileType,
        url: URL,
    });
    /*----------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------|Event Methods|-------------------------------------------------*/
    /*----------------------------------------------------------------------------------------------------------------*/
    btnFile_onClick() {
        if (this.#controls.btnFile)
            this.#controls.btnFile.click();
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    btnReset_onClick() {
        try {
            this.#controls.edbFileName.value = '';
            this.#controls.imgPreview.src = this.#constant.emptyPictureForImagePicking;
            this.#controls.btnReset.style.display = 'none';
            this.#controls.pnlPreviewOverlay.style.display = 'block';
            this.#controls.lblFileSizeValue.style.display = 'none';
            this.#controls.lblFileSizeCaption.style.display = 'none';
            this.#chosenFile = null;
        } catch (ex) {
        }
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    edbFile_onChange() {
        try {
            if (!this.#controls.btnFile.files){
                return  false;
            }
            if (this.#controls.btnFile.files.length < 1){
                return  false;
            }
            const reader = new FileReader();
            /*--. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . --*/
            reader.onloadend = this.onFileLoadEnd.bind(this);
            /*--. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . --*/
            reader.fileName = this.#controls.btnFile.files[0].name;
            reader.readAsDataURL(this.#controls.btnFile.files[0]);
            /*--. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . --*/
        } catch (ex) {
            this.#controls.edbFileName.value = this.#constant.loadingFileFailedMessage;
            this.#controls.imgPreview.src = this.#constant.warningPicture;
            return false;
        }
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    onFileLoadEnd(file) {
        const fileBinary = file.target.result;

        if (fileBinary === "") {
            this.#controls.imgPreview.src = this.#constant.warningPicture;
            return false;
        }

        if (this.#props.maxFileSize !== 0) {
            if (fileBinary.length > (this.#props.maxFileSize * 1024)) {
                this.#controls.edbFileName.value = this.#constant.fileSizeExceedMessage;
                this.#controls.imgPreview.src = this.#constant.warningPicture;
                return false;
            }
        }
        const fileId = this.generateGuid();
        const fileName = this.getFileName(this.#controls.btnFile.files[0].name);
        const fileExtension = this.getFileExtension(this.#controls.btnFile.files[0].name);
        const fileType = this.getBinaryType(fileBinary);
        const fileSize = this.FormatBytes(fileBinary.length, 0);
        this.#chosenFile = this.generateFileObject(fileId, fileBinary, fileName, fileExtension, fileType, null);

        this.#controls.edbFileName.value = fileName;
        this.#controls.lblFileSizeValue.innerHTML = fileSize;

        this.#controls.btnReset.style.display = 'block';
        this.#controls.pnlPreviewOverlay.style.display = 'none';
        this.#controls.lblFileSizeValue.style.display = 'block';
        this.#controls.lblFileSizeCaption.style.display = 'block';
        if (this.#props.fileType === FileTypes.Image) {
            this.#controls.imgPreview.src = fileBinary;
        } else {
            this.#controls.imgPreview.src = this.getFileIconURL(fileType);
        }
        return true;
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------|Render Methods|------------------------------------------------*/
    /*----------------------------------------------------------------------------------------------------------------*/
    renderFilePickerArea() {
        return (
            '<div class="md-file-picker-control-area">' +
            '    <div class="md-file-picker-control-container">' +
            '        <input id="edbFileName-' + this.#constant.uid + '" class="md-file-name-text md-place-holder-text" ' +
            '               placeholder="' + this.#props.placeHolder + '" readonly/>' +
            '        <button id="btnFilePicker-' + this.#constant.uid + '" class="md-file-chose-button md-button"></button>' +
            '         <input id="btnFile-' + this.#constant.uid + '" type="file" style="display: none" ' +
            '                accept="' + this.getAcceptFileQuery() + '">' +
            '    </div>' +
            '</div>');
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    renderPreviewArea() {
        return (
            '<div class="md-file-preview-area">' +
            '   <div class="md-file-preview-container">' +
            '       <div class="md-file-preview-control">' +
            '           <img id="imgPreview-' + this.#constant.uid +'" class="md-file-preview-image" ' +
            '                alt=""/>' +
            '           <div id="pnlPreviewOverlay-' + this.#constant.uid +'" class="md-file-preview-overlay"></div>'+
            '       </div>' +
            '   </div>' +
            '   <div class="md-reset-button-container">' +
            '       <button id="btnReset-' + this.#constant.uid +'" class="md-reset-button md-button"></button>' +
            '       <p id="lblFileSizeCaption-' + this.#constant.uid +'" class="md-file-size-caption">'+ this.#constant.fileSizeCaption +'</p>'+
            '       <p id="lblFileSizeValue-' + this.#constant.uid +'"  class="md-file-size-value"></p>'+
            '   </div>' +
            '</div>');
    }
    /*----------------------------------------------------------------------------------------------------------------*/
    render() {
        return (
            '<div class="md-file-control">' +
            this.renderFilePickerArea() +
            this.renderPreviewArea() +
            '</div>'
        );
    }
    /*----------------------------------------------------------------------------------------------------------------*/
}