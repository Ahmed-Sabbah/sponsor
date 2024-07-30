<script setup>

function scrollToAbout() {
    const element = $('#about')
    var top = element[0].offsetTop
    window.scrollTo(0, top)
}

</script>
<template>
    <section class="main_banner" id="intro">
        <div class="intro">
            <h1>مشروع <span>الكفيل</span> الخيري</h1>
            <p>بادر معنا بعمل الخير في مشروع الكفيل الخيري</p>
            <div class="scroll-down">
                <span @click="scrollToAbout()">
                    <font-awesome-icon icon="chevron-down" />
                </span>
            </div>
        </div>
    </section>
</template>