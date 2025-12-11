<script lang="ts">
    import { onMount } from "svelte";
    import QRCode, {
        type QRCodeMaskPattern,
        type QRCodeErrorCorrectionLevel,
    } from "qrcode";
    import { parse, formatHex } from 'culori';

    let {
        link,
        qrColor = "#141414",
        qrColorVariable = "",
        backgroundColor = "#f0f0f0",
        backgroundColorVariable = "",
        scale = "4",
        /**@type {QRCodeErrorCorrectionLevel}*/
        error = "M",
        version = undefined, // 0-40
        maskPattern = undefined, // 0-7
    } = $props();

    let observer: MutationObserver;

    function getCurrentQRColor() {
        if (qrColorVariable) {
            return getCSSVarValue(qrColorVariable);
        }
        return qrColor ?? "#141414";
    }

    function getCurrentBackgroundColor() {
        if (backgroundColorVariable) {
            return getCSSVarValue(backgroundColorVariable);
        }
        return backgroundColor ?? "#f0f0f0";
    }

    function getCSSVarValue(name: string) {
        let color = getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();

        if (!color.startsWith("#")){
            console.log()
        }
        return `${formatHex(parse(color))}`
    }

    onMount(() => {
        // If using variable, observe CSS changes
        if (qrColorVariable || backgroundColorVariable) {
            observer = new MutationObserver(() => {
                qrColor = getCurrentQRColor();
                backgroundColor = getCurrentBackgroundColor();
            });
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["style", "class", "data-theme"],
            });
            qrColor = getCurrentQRColor();
            backgroundColor = getCurrentBackgroundColor();
        }
    });
</script>

<canvas
    {@attach (canvas) => {
        $effect(() => {
            console.log("color is", qrColor)
            QRCode.toCanvas(canvas, link, {
                errorCorrectionLevel: error as QRCodeErrorCorrectionLevel,
                scale: parseFloat(scale),
                color: {
                    dark: qrColor,
                    light: backgroundColor,
                },
                maskPattern: parseInt(maskPattern) as QRCodeMaskPattern,
                version: version,
            });
        });
    }}
></canvas>

<style>
    canvas {
        width: 100%;
    }
</style>