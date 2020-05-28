<template>
    <div>
        <header>
            <slot name="header"/>
        </header>
        <main>
            <slot />
        </main>
        <footer>
            <slot name="footer"/>
        </footer>
    </div>
</template>

<style scoped>
header{
    width:100%;
    height: 100px;
    background-color: red;
}
main{
    width:100%;
    height: 400px;
    background-color: green;
}
footer{
    width:100%;
    height: 200px;
    background-color: purple;
}
</style>

